---
description: 'File structure rules, placement guidelines, and naming conventions'
alwaysApply: true
globs: ['src/**/*']
---

# File Structure Rules

Complete guide to file organization, placement rules, and naming conventions for the Yoursaju Web project.

## Directory Structure

### Directory Structure Diagram

```mermaid
graph TD
    A[src/] --> B[app/]
    A --> C[components/]
    A --> D[api/]
    A --> E[hooks/]
    A --> F[store/]
    A --> G[shared/]
    A --> H[scripts/]
    A --> I[utils/]
    A --> J[config/]
    A --> K[enum/]

    B --> B1[(pages)/]
    B --> B2[api/]

    C --> C1[shared/]
    C --> C2[(pages)/]

    D --> D1[bff/]
    D --> D2[user/]
    D --> D3[status/]

    E --> E1[api/]
    E --> E2[types/]

    G --> G1[lib/]
    G --> G2[hooks/]
    G --> G3[providers/]
    G --> G4[headless/]
```

### Directory Purpose

| Directory         | Purpose                                 | Example                         |
| ----------------- | --------------------------------------- | ------------------------------- |
| `src/app/`        | Next.js App Router pages and API routes | `app/(pages)/home/page.tsx`     |
| `src/components/` | React components                        | `components/shared/Button.tsx`  |
| `src/api/`        | API functions and types                 | `api/user/index.ts`             |
| `src/hooks/`      | Custom React hooks                      | `hooks/api/user/useGetUser.ts`  |
| `src/store/`      | Zustand stores                          | `store/useAuthStore.tsx`        |
| `src/shared/`     | Shared utilities and libraries          | `shared/lib/axios/index.ts`     |
| `src/scripts/`    | Scripts (imported in layout)            | `scripts/ChunkErrorHandler.tsx` |
| `src/utils/`      | Pure utility functions                  | `utils/index.ts`                |
| `src/config/`     | Configuration files                     | `config/metadata.ts`            |
| `src/enum/`       | Enumeration constants                   | `enum/scheme.ts`                |

## File Placement Rules

### API Files

#### BFF API Routes

- **Location**: `src/app/api/{endpoint}/route.ts`
- **Pattern**:

  ```typescript
  // src/app/api/login/route.ts
  import { withApiLogging } from '@/shared/lib/api/with-logging'

  async function handler(request: NextRequest): Promise<Response> {
    // Implementation
  }

  export const POST = withApiLogging(handler)
  ```

- **Rules**:
  - Use `withApiLogging` wrapper
  - Export HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
  - Use `loggedFetch` for backend calls
  - Handle cookies if needed

#### Client API Functions

- **Location**: `src/api/{domain}/index.ts`
- **Pattern**:

  ```typescript
  // src/api/user/index.ts
  import axios from '@/shared/lib/axios'
  import { type GetUserRes } from './types'

  export const getUserProfile = async (): Promise<GetUserRes['data']> => {
    const { data } = await axios.get<GetUserRes['data']>('/users/me')
    return data
  }
  ```

- **Rules**:
  - Use axios instance from `@/shared/lib/axios`
  - Return typed data: `Promise<XxxRes['data']>`
  - Group by domain (e.g., `user`, `status`, `bff`)

#### API Types

- **Location**: `src/api/{domain}/types.ts`
- **Pattern**:

  ```typescript
  // src/api/user/types.ts
  import { type BaseRes } from '@/api/type'

  export interface User {
    id: string
    name: string
  }

  export interface GetUserRes extends BaseRes<{
    user: User
  }> {}

  export interface UpdateUserReq {
    name: string
  }
  ```

- **Rules**:
  - Request types: `XxxReq`
  - Response types: `XxxRes extends BaseRes<T>`
  - Paginated responses: `XxxListRes extends PaginatedRes<T>`

### Components

#### Shared Components

- **Location**: `src/components/shared/{ComponentName}.tsx`
- **Pattern**:

  ```typescript
  // src/components/shared/Button.tsx
  'use client'

  import twMerge from '@/shared/lib/twMerge'

  export interface ButtonProps {
    size: 'sm' | 'md' | 'lg'
  }

  export default function Button({ size, ...props }: ButtonProps) {
    return <button className={twMerge('base-classes')} {...props} />
  }
  ```

- **Rules**:
  - Reusable across pages
  - Use `forwardRef` when needed
  - Export props interface
  - Use `'use client'` if needed

#### Page Components

- **Location**: `src/components/(pages)/{page}/{ComponentName}.tsx`
- **Pattern**:

  ```typescript
  // src/components/(pages)/home/HomePage.tsx
  'use client'

  export default function HomePage() {
    return <div>Home Page</div>
  }
  ```

- **Rules**:
  - Page-specific components
  - Can use Parallel Routes: `@Navbar`, `@MenuBar`
  - Group by page name

#### Parallel Route Components

- **Location**: `src/components/(pages)/{page}/@Navbar/{ComponentName}.tsx`
- **Pattern**:

  ```typescript
  // src/components/(pages)/home/@Navbar/HomeNavbar.tsx
  'use client'

  export default function HomeNavbar() {
    return <nav>Navbar</nav>
  }
  ```

- **Rules**:
  - Use `@` prefix for parallel routes
  - Match layout slot names

### Hooks

#### API Hooks

- **Location**: `src/hooks/api/{domain}/useXxx.ts`
- **Pattern**:

  ```typescript
  // src/hooks/api/user/useGetUser.ts
  import { getUserProfile } from '@/api/user'
  import { useQuery } from '@tanstack/react-query'
  import { type HookOptions } from '@/hooks/types/CustomHooks'

  export const useGetUser = (options?: HookOptions) => {
    return useQuery({
      queryKey: ['user', 'profile'],
      queryFn: async () => await getUserProfile(),
      ...options
    })
  }
  ```

- **Rules**:
  - Use React Query
  - Accept `HookOptions` parameter
  - Group by domain
  - Query key follows pattern: `['domain', 'resource']`

#### Shared Hooks

- **Location**: `src/shared/hooks/useXxx.ts`
- **Pattern**:

  ```typescript
  // src/shared/hooks/useToast.ts
  import { ToastContext } from '@/shared/providers/ToastProvider'
  import { useContext } from 'react'

  export const useToast = () => {
    const context = useContext(ToastContext)
    if (context === undefined) {
      throw new Error('ToastProvider is not defined.')
    }
    return context.showToast
  }
  ```

- **Rules**:
  - Cross-cutting concerns (Toast, Theme, etc.)
  - Provider-related hooks

#### Hook Types

- **Location**: `src/hooks/types/CustomHooks.ts`
- **Pattern**:
  ```typescript
  export interface HookOptions {
    staleTime?: number
    meta?: {
      showSpinner?: boolean
      showToast?: boolean
    }
  }
  ```

### Store

#### Zustand Stores

- **Location**: `src/store/useXxxStore.tsx`
- **Pattern**:

  ```typescript
  // src/store/useAuthStore.tsx
  'use client'

  import { create } from 'zustand'

  export interface AuthStoreState {
    accessToken: string
  }

  export interface AuthStoreFunctions {
    setToken: (token: string) => void
  }

  const initialState: AuthStoreState = {
    accessToken: ''
  }

  export const useAuthStore = create<AuthStoreState & AuthStoreFunctions>((set) => ({
    ...initialState,
    setToken: (token) => set({ accessToken: token })
  }))
  ```

- **Rules**:
  - Pattern: `useXxxStore`
  - Export `StoreState` and `StoreFunctions` interfaces
  - Use `'use client'` directive
  - Define `initialState` separately

### Utilities

#### Shared Libraries

- **Location**: `src/shared/lib/{library}/index.ts`
- **Examples**:
  - `src/shared/lib/axios/index.ts`
  - `src/shared/lib/logger/index.ts`
  - `src/shared/lib/firebase/index.ts`
- **Rules**:
  - One library per directory
  - Export from `index.ts`
  - Group related utilities

#### Pure Utilities

- **Location**: `src/utils/index.ts`
- **Pattern**:

  ```typescript
  // src/utils/index.ts
  export const isValidRedirectUrl = (url: string): boolean => {
    // Implementation
  }

  export const getRedirectUrl = (url: URL): string => {
    // Implementation
  }
  ```

- **Rules**:
  - Pure functions only
  - Export as named exports
  - No side effects

### Configuration

#### Config Files

- **Location**: `src/config/{name}.ts`
- **Examples**:
  - `src/config/metadata.ts`
- **Rules**:
  - Constants and configuration
  - Export named constants

### Scripts

#### Scripts

- **Location**: `src/scripts/{ScriptName}.tsx`
- **Examples**:
  - `src/scripts/ChunkErrorHandler.tsx`
  - `src/scripts/KakaoSdk.tsx`
- **Rules**:
  - Imported in root layout
  - Global scripts
  - Use `'use client'` if needed

### Enums

#### Enum Files

- **Location**: `src/enum/{name}.ts`
- **Pattern**:
  ```typescript
  // src/enum/scheme.ts
  export const CUSTOM_APP_URL_SCHEME = 'yoursaju'
  export const CUSTOM_APP_URL_HOST = 'yoursaju.kr'
  ```
- **Rules**:
  - Constants and enums
  - Export named constants

## Naming Conventions

### File Naming

| Type         | Pattern                     | Example                         | Location                  |
| ------------ | --------------------------- | ------------------------------- | ------------------------- |
| Component    | `PascalCase.tsx`            | `Button.tsx`, `HomePage.tsx`    | `components/`             |
| Hook         | `camelCase.ts` (use prefix) | `useBFFLogin.ts`, `useToast.ts` | `hooks/`, `shared/hooks/` |
| API Function | `camelCase.ts`              | `getUserProfile.ts`             | `api/{domain}/index.ts`   |
| API Type     | `PascalCase.ts`             | `SignInReq`, `GetUserRes`       | `api/{domain}/types.ts`   |
| Store        | `useXxxStore.tsx`           | `useAuthStore.tsx`              | `store/`                  |
| Utility      | `camelCase.ts`              | `isValidRedirectUrl.ts`         | `utils/`                  |
| Config       | `camelCase.ts`              | `metadata.ts`                   | `config/`                 |
| Enum         | `camelCase.ts`              | `scheme.ts`                     | `enum/`                   |
| Script       | `PascalCase.tsx`            | `ChunkErrorHandler.tsx`         | `scripts/`                |

### Directory Naming

| Type           | Pattern     | Example                 |
| -------------- | ----------- | ----------------------- |
| Domain         | `camelCase` | `user`, `status`, `bff` |
| Page           | `camelCase` | `home`, `profile`       |
| Route Group    | `(name)`    | `(pages)`               |
| Parallel Route | `@name`     | `@Navbar`, `@MenuBar`   |

## Import Path Aliases

### Path Aliases

- `@/*` → `src/*`
- `public/*` → `public/*`

### Usage Examples

```typescript
// ✅ Correct
import Button from '@/components/shared/Button'
import { useAuthStore } from '@/store/useAuthStore'
import { getUserProfile } from '@/api/user'

// ❌ Wrong
import Button from '../../../components/shared/Button'
import { useAuthStore } from '../../store/useAuthStore'
```

## File Organization Rules

### 1. API Domain Separation

- Each domain has its own folder: `bff`, `user`, `status`
- Each domain has:
  - `index.ts` - API functions
  - `types.ts` - Type definitions
- Example structure:
  ```
  src/api/
  ├── bff/
  │   ├── auth/
  │   │   ├── index.ts
  │   │   └── types.ts
  ├── user/
  │   ├── index.ts
  │   └── types.ts
  └── status/
      ├── index.ts
      └── types.ts
  ```

### 2. Component Grouping

- **Shared components**: `components/shared/`
  - Reusable across pages
  - Examples: `Button`, `Navbar`, `Modal`
- **Page components**: `components/(pages)/{page}/`
  - Page-specific components
  - Examples: `components/(pages)/home/HomePage.tsx`
- **Parallel Routes**: `components/(pages)/{page}/@Slot/`
  - Layout slot components
  - Examples: `components/(pages)/home/@Navbar/HomeNavbar.tsx`

### 3. Hook Organization

- **API hooks**: `hooks/api/{domain}/`
  - Domain-specific hooks
  - Examples: `hooks/api/user/useGetUser.ts`
- **Shared hooks**: `shared/hooks/`
  - Cross-cutting hooks
  - Examples: `shared/hooks/useToast.ts`
- **Hook types**: `hooks/types/`
  - Shared hook types
  - Examples: `hooks/types/CustomHooks.ts`

### 4. Store Pattern

- One store per domain/concern
- Store name matches domain: `useAuthStore`, `useStatusAppStore`
- Location: `store/useXxxStore.tsx`

### 5. Utility Separation

- **Shared libs**: `shared/lib/{library}/`
  - Library wrappers and configurations
  - Examples: `shared/lib/axios/`, `shared/lib/logger/`
- **Pure utils**: `utils/`
  - Pure utility functions
  - Examples: `utils/index.ts`
- **Config**: `config/`
  - Configuration constants
  - Examples: `config/metadata.ts`

## File Placement Decision Tree

### Where should I put this file?

```
Is it a Next.js page or API route?
├─ Yes → src/app/{route}/page.tsx or route.ts
└─ No → Is it a React component?
    ├─ Yes → Is it reusable across pages?
    │   ├─ Yes → src/components/shared/{ComponentName}.tsx
    │   └─ No → src/components/(pages)/{page}/{ComponentName}.tsx
    └─ No → Is it an API function?
        ├─ Yes → src/api/{domain}/index.ts
        └─ No → Is it a hook?
            ├─ Yes → Is it API-related?
            │   ├─ Yes → src/hooks/api/{domain}/useXxx.ts
            │   └─ No → src/shared/hooks/useXxx.ts
            └─ No → Is it a store?
                ├─ Yes → src/store/useXxxStore.tsx
                └─ No → Is it a utility?
                    ├─ Yes → Is it a library wrapper?
                    │   ├─ Yes → src/shared/lib/{library}/index.ts
                    │   └─ No → src/utils/index.ts
                    └─ No → Is it configuration?
                        ├─ Yes → src/config/{name}.ts
                        └─ No → Is it a script?
                            ├─ Yes → src/scripts/{ScriptName}.tsx
                            └─ No → src/enum/{name}.ts
```

## Common Mistakes

### ❌ Wrong File Placement

```typescript
// ❌ API function in component file
// src/components/UserProfile.tsx
export const getUserProfile = async () => { }

// ❌ Component in utils
// src/utils/Button.tsx
export default function Button() { }

// ❌ Store in component
// src/components/Auth.tsx
export const useAuthStore = create(...)

// ❌ Hook in API file
// src/api/user/index.ts
export const useGetUser = () => { }
```

### ✅ Correct File Placement

```typescript
// ✅ API function in API file
// src/api/user/index.ts
export const getUserProfile = async () => { }

// ✅ Component in components
// src/components/shared/Button.tsx
export default function Button() { }

// ✅ Store in store
// src/store/useAuthStore.tsx
export const useAuthStore = create(...)

// ✅ Hook in hooks
// src/hooks/api/user/useGetUser.ts
export const useGetUser = () => { }
```

## Quick Reference

### File Location Cheat Sheet

| What             | Where                                               |
| ---------------- | --------------------------------------------------- |
| Page             | `src/app/{route}/page.tsx`                          |
| API Route        | `src/app/api/{endpoint}/route.ts`                   |
| Shared Component | `src/components/shared/{ComponentName}.tsx`         |
| Page Component   | `src/components/(pages)/{page}/{ComponentName}.tsx` |
| API Function     | `src/api/{domain}/index.ts`                         |
| API Types        | `src/api/{domain}/types.ts`                         |
| API Hook         | `src/hooks/api/{domain}/useXxx.ts`                  |
| Shared Hook      | `src/shared/hooks/useXxx.ts`                        |
| Store            | `src/store/useXxxStore.tsx`                         |
| Library          | `src/shared/lib/{library}/index.ts`                 |
| Utility          | `src/utils/index.ts`                                |
| Config           | `src/config/{name}.ts`                              |
| Script           | `src/scripts/{ScriptName}.tsx`                      |
| Enum             | `src/enum/{name}.ts`                                |

## Related Rules

- `blueprint`: Architecture overview
- `project-standards`: Naming conventions and code style
- `component-patterns`: Component file patterns
- `api-patterns`: API file patterns
- `state-management`: Store and hook file patterns
