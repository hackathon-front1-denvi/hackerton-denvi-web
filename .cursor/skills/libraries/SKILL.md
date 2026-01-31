---
name: libraries
description: 프로젝트에서 사용하는 모든 라이브러리의 정의, 사용 패턴, 모범 사례. 특정 라이브러리를 사용하거나 라이브러리 관련 질문이 있을 때 사용합니다.
---

# Library Definitions

프로젝트에서 사용하는 모든 라이브러리의 정의, 사용 패턴, 모범 사례 가이드입니다.

## When to Use

- 특정 라이브러리 사용 방법을 알아야 할 때
- 라이브러리 관련 패턴이나 모범 사례를 확인할 때
- 새로운 라이브러리를 추가하려고 할 때
- 라이브러리 관련 문제 해결이 필요할 때

## Core Framework Libraries

### Next.js (15.5.9)

**Purpose**: React framework with App Router for server-side rendering and routing

**Usage**:

- App Router structure: `src/app/` directory
- Server Components by default
- API Routes: `src/app/api/{endpoint}/route.ts`
- Parallel Routes: `@Navbar`, `@MenuBar` slots
- Metadata API for SEO

**Patterns**:

```typescript
// Page component
export default function Page() {
  return <div>Content</div>
}

// API route
export const POST = async (request: NextRequest) => {
  return Response.json({ data: 'result' })
}
```

**Key Features Used**:

- App Router
- Server Components
- API Routes (BFF pattern)
- Parallel Routes
- Metadata API

### React (19.2.3)

**Purpose**: UI library for building user interfaces

**Usage**:

- Functional components only
- Hooks for state and side effects
- Server Components (default) vs Client Components (`'use client'`)

**Patterns**:

```typescript
// Server Component (default)
export default function Component() {
  return <div>Server Component</div>
}

// Client Component
'use client'
export default function Component() {
  const [state, setState] = useState()
  return <div>Client Component</div>
}
```

**Key Features Used**:

- Functional components
- Hooks (useState, useEffect, useContext, etc.)
- Server Components
- forwardRef for ref forwarding

### TypeScript (5.9.3)

**Purpose**: Typed superset of JavaScript

**Configuration**: Strict mode enabled

**Patterns**:

```typescript
// Interface for props
interface ComponentProps {
  title: string
  optional?: boolean
}

// Type for API responses
export interface ApiResponse extends BaseRes<{
  data: unknown
}> {}

// Generic types
function process<T>(data: T): T {
  return data
}
```

**Best Practices**:

- Avoid `any` type (use comments if necessary)
- Define types for all functions
- Use `type` keyword for type-only imports
- Extend interfaces when possible

## Styling Libraries

### Tailwind CSS (4)

**Purpose**: Utility-first CSS framework

**Configuration**: Custom font sizes, colors, and utilities in `tailwind.config.ts`

**Usage**:

```typescript
// Utility classes
<div className="flex items-center justify-center p-4 bg-white">
  <span className="text-text_16_24 font-bold">Text</span>
</div>
```

**Custom Utilities**:

- Font sizes: `text-text_XX_XX` pattern
- Colors: `primary`, `secondary`, `teritary`, `fourth`, `gray-06`
- Border radius: `rounded-2xsm`, `rounded-xsm`, etc.
- Safe area: `pb-safe`, `pt-safe`, `pb-safe-offset-XX`

**Best Practices**:

- Use utility classes directly
- Use `twMerge` for dynamic classes
- Follow custom font size pattern
- Consider mobile safe areas

### tailwind-merge (3.3.1)

**Purpose**: Merge Tailwind CSS classes intelligently

**Usage**:

```typescript
import twMerge from '@/shared/lib/twMerge'

// Merge classes with conflict resolution
className={twMerge(
  'text-black',
  condition && 'text-white', // Will override text-black
  props.className
)}
```

**Custom Configuration**: Extended in `src/shared/lib/twMerge/index.ts` for custom font sizes

### tailwindcss-safe-area-capacitor (0.5.1)

**Purpose**: Safe area utilities for Capacitor mobile apps

**Usage**:

- `pb-safe`: Bottom safe area padding
- `pt-safe`: Top safe area padding
- `pb-safe-offset-XX`: Bottom safe area with offset

**When to Use**: All mobile layouts that need safe area handling

## State Management Libraries

### Zustand (5.0.6)

**Purpose**: Lightweight state management for client state

**Usage Pattern**:

```typescript
'use client'

import { create } from 'zustand'

export interface StoreState {
  field: string
}

export interface StoreFunctions {
  setField: (field: string) => void
}

export const useXxxStore = create<StoreState & StoreFunctions>((set) => ({
  field: '',
  setField: (field) => set({ field })
}))
```

**When to Use**:

- Client-side state
- Global state that doesn't need server sync
- UI state (modals, themes, etc.)

**Stores in Project**:

- `useAuthStore`: Authentication state
- `useStatusAppStore`: App configuration state
- `useSpinnerStore`: Loading spinner state
- `useSettingStore`: User settings (with persist)

**Best Practices**:

- Separate state and functions interfaces
- Use `initialState` constant
- Use `'use client'` directive
- Use persist middleware for localStorage when needed

### React Query / TanStack Query (5.81.5)

**Purpose**: Server state management, data fetching, and caching

**Usage Pattern**:

```typescript
import { useQuery, useMutation } from '@tanstack/react-query'

// Query
const { data, isLoading, error } = useQuery({
  queryKey: ['domain', 'resource'],
  queryFn: async () => await apiFunction()
})

// Mutation
const { mutate, mutateAsync } = useMutation({
  mutationFn: apiFunction,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['domain'] })
  }
})
```

**Configuration**: Custom provider in `src/shared/providers/ReactQueryProvider.tsx`

**Features Used**:

- Query caching
- Automatic refetching
- Error handling (global)
- Loading states
- Cache invalidation
- Optimistic updates

**Best Practices**:

- Use descriptive query keys
- Group by domain: `['user', 'profile']`
- Use `HookOptions` for customization
- Configure `meta.showToast` for error messages
- Use `meta.showSpinner` for loading indicators

## HTTP & API Libraries

### Axios (1.7.7)

**Purpose**: HTTP client for API requests

**Configuration**: Custom instance in `src/shared/lib/axios/index.ts`

**Features**:

- Automatic token injection
- Token refresh on 401
- Request/response interceptors
- BaseRes unwrapping
- Error handling

**Usage**:

```typescript
import axios from '@/shared/lib/axios'

// GET request
const { data } = await axios.get<ResponseType>('/endpoint')

// POST request
const { data } = await axios.post<ResponseType>('/endpoint', body)

// Public endpoint (no auth)
const { data } = await axios.get('/public', {
  headers: { authRequired: false }
})
```

**Best Practices**:

- Use typed responses: `Promise<XxxRes['data']>`
- Let interceptor handle auth
- Use `authRequired: false` for public endpoints
- Handle FormData automatically (interceptor removes Content-Type)

## Mobile Libraries

### Capacitor Core (6.1.2)

**Purpose**: Cross-platform native runtime for web apps

**Usage**:

```typescript
// Platform detection
const isNative = window.Capacitor?.isNativePlatform() ?? false
const platform = window.Capacitor?.getPlatform() ?? 'web'

// App info
import { App } from '@capacitor/app'
const appInfo = await App.getInfo()
```

**Plugins Used**:

- `@capacitor/app`: App lifecycle and info
- `@capacitor/browser`: Open external browser
- `@capacitor/camera`: Camera access
- `@capacitor/device`: Device information
- `@capacitor/haptics`: Haptic feedback
- `@capacitor/keyboard`: Keyboard events
- `@capacitor/push-notifications`: Push notifications
- `@capacitor/splash-screen`: Splash screen control
- `@capacitor/status-bar`: Status bar styling

**Best Practices**:

- Always check `isNativePlatform()` before using plugins
- Handle platform-specific code
- Use safe area utilities
- Test on both iOS and Android

### Capacitor Community Plugins

- `@capacitor-community/apple-sign-in`: Apple Sign In
- `@capacitor-community/media`: Media handling
- `capacitor-native-settings`: Open device settings
- `capacitor-swipe-back-plugin`: iOS swipe back gesture

## UI Component Libraries

### react-hot-toast (2.5.2)

**Purpose**: Toast notification library

**Usage**: Wrapped in custom `ToastProvider`

**Pattern**:

```typescript
import { useToast } from '@/shared/hooks/useToast'

const toast = useToast()
toast('success', 'Operation successful')
toast('error', 'Operation failed')
```

**Configuration**: Custom styling in `src/components/shared/Toast.tsx`

### react-loading-skeleton (3.5.0)

**Purpose**: Skeleton loading components

**Usage**:

```typescript
import Skeleton from '@/components/shared/Skeleton'

<Skeleton className="w-full h-20" />
```

**When to Use**: Loading states for content placeholders

### react-infinite-scroll-component (6.1.0)

**Purpose**: Infinite scroll functionality

**Usage**: For paginated lists that load more on scroll

**When to Use**: Long lists that need pagination

### swiper (11.2.10)

**Purpose**: Touch slider/carousel

**Usage**: For image galleries, carousels, tabbed content

**Pattern**: Used in `Tabbar` component for swipeable tabs

### lottie-react (2.4.1)

**Purpose**: Lottie animation rendering

**Usage**:

```typescript
import Lottie from 'lottie-react'
import animationData from '@/assets/animations/spinner.json'

<Lottie
  animationData={animationData}
  loop={true}
  width={64}
  height={64}
/>
```

**When to Use**: Loading animations, decorative animations

## Utility Libraries

### date-fns (4.1.0)

**Purpose**: Date manipulation and formatting

**Usage**: Date parsing, formatting, and manipulation

**When to Use**: Date operations instead of native Date methods

### uuid (11.1.0)

**Purpose**: Generate UUIDs

**Usage**: Unique identifiers for requests, entities, etc.

**Pattern**:

```typescript
import { v4 as uuidv4 } from 'uuid'
const id = uuidv4()
```

### browser-image-compression (2.0.2)

**Purpose**: Client-side image compression

**Usage**: Compress images before upload

**When to Use**: Image uploads that need size reduction

### idb (8.0.3)

**Purpose**: IndexedDB wrapper

**Usage**: Client-side database storage

**When to Use**: Offline data storage, caching

## Monitoring & Analytics

### @datadog/browser-logs (6.18.0)

**Purpose**: Browser logging to Datadog

**Usage**: Error logging, event tracking

**Pattern**: Used in `ChunkErrorHandler` for error reporting

### @datadog/browser-rum (6.18.0)

**Purpose**: Real User Monitoring

**Usage**: Performance monitoring, user session tracking

**When to Use**: Production monitoring

### firebase (11.2.0)

**Purpose**: Firebase services (Analytics, etc.)

**Usage**: Analytics tracking, push notifications (planned)

**Configuration**: Initialized in `src/shared/lib/firebase/index.ts`

## Development Tools

### Prettier (3.7.4)

**Purpose**: Code formatting

**Plugins**:

- `prettier-plugin-organize-imports`: Import organization
- `prettier-plugin-tailwindcss`: Tailwind class sorting

**Usage**: `yarn format` or `yarn format:fix`

### ESLint

**Purpose**: Code linting

**Configuration**: Next.js default configuration

**Usage**: `yarn lint`

### Jest (30.0.4)

**Purpose**: Testing framework

**Configuration**: `jest.config.ts`

**Usage**: `yarn test`

**Environment**: `jest-environment-jsdom` for React components

### TypeScript (5.9.3)

**Purpose**: Type checking

**Configuration**: `tsconfig.json` with strict mode

**Usage**: `yarn type-check`

## Build Tools

### @svgr/webpack (8.1.0)

**Purpose**: SVG as React components

**Configuration**: Webpack config in `next.config.mjs`

**Usage**:

```typescript
import Icon from '@/assets/icons/icon.svg'

<Icon className="w-4 h-4" />
```

**Pattern**: All SVG imports become React components

## Library Usage Guidelines

### When to Add a New Library

1. **Check if existing library can solve the problem**
2. **Consider bundle size impact**
3. **Check mobile compatibility**
4. **Verify TypeScript support**
5. **Review maintenance status**

### Library Selection Criteria

- ✅ TypeScript support
- ✅ Active maintenance
- ✅ Good documentation
- ✅ Small bundle size
- ✅ Mobile compatible
- ✅ Fits project architecture

### Library Organization

- **Core**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS and utilities
- **State**: Zustand, React Query
- **HTTP**: Axios
- **Mobile**: Capacitor plugins
- **UI**: Component libraries
- **Utils**: Utility functions
- **Dev**: Development tools

## Version Management

### Package Manager

- **Yarn**: 1.22.22 (specified in packageManager field)

### Version Pinning

- Major versions pinned in `package.json`
- Use exact versions for critical dependencies
- Use caret (^) for patch updates

### Update Strategy

1. Test updates in development
2. Check breaking changes
3. Update related code if needed
4. Run full test suite
5. Update documentation if API changes

## Library-Specific Patterns

### React Query Patterns

- Query keys: `['domain', 'resource', id]`
- Cache invalidation after mutations
- Error handling via provider
- Loading states via `isLoading`/`isPending`

### Zustand Patterns

- Store naming: `useXxxStore`
- Separate state and functions interfaces
- Use persist middleware for localStorage
- Client components only

### Capacitor Patterns

- Platform detection before plugin use
- Safe area handling
- Native feature checks
- Error handling for missing plugins

### Tailwind Patterns

- Custom font sizes: `text-text_XX_XX`
- Safe area utilities
- Use `twMerge` for dynamic classes
- Mobile-first responsive design

## Common Library Combinations

### API + React Query

```typescript
// API function
export const getData = async () => {}

// React Query hook
export const useGetData = () => {
  return useQuery({
    queryKey: ['domain', 'data'],
    queryFn: getData
  })
}
```

### Zustand + Persist

```typescript
export const useStore = create(
  persist(
    (set) => ({ ... }),
    { name: 'store-name', storage: createJSONStorage(() => localStorage) }
  )
)
```

### Capacitor + Platform Check

```typescript
if (window.Capacitor?.isNativePlatform()) {
  await CapacitorPlugin.doSomething()
}
```

## Library Troubleshooting

### Common Issues

#### React Query Not Refetching

- Check query key dependencies
- Verify `enabled` option
- Check cache configuration

#### Zustand State Not Updating

- Verify `'use client'` directive
- Check selector usage
- Verify store initialization

#### Capacitor Plugin Not Working

- Check platform detection
- Verify plugin installation
- Check native permissions

#### Tailwind Classes Not Applying

- Verify class names
- Check `twMerge` usage
- Verify Tailwind config

## Library Alternatives Considered

### Why Zustand over Redux?

- Simpler API
- Less boilerplate
- Better TypeScript support
- Smaller bundle size

### Why React Query over SWR?

- Better devtools
- More features (mutations, cache management)
- Better TypeScript support
- Active development

### Why Axios over Fetch?

- Interceptors for auth
- Better error handling
- Request/response transformation
- Automatic JSON parsing

## Related Rules

- `blueprint`: Technology stack overview
- `api-patterns`: Axios and HTTP library usage patterns
- `state-management`: Zustand and React Query usage patterns
- `component-patterns`: UI library usage patterns
- `mobile-capacitor`: Capacitor plugin usage patterns
