---
name: feature-development
description: Feature Development
disable-model-invocation: true
---

# Feature Development

Use this command when implementing a new feature. Follow the steps in order.

**Usage**: `/feature-development [feature description]`

## Workflow Steps

### 1. Planning & Analysis

- [ ] Understand feature requirements
- [ ] Identify affected components/modules
- [ ] Check existing patterns and conventions
- [ ] Plan API endpoints (if needed)
- [ ] Design component structure

### 2. API Integration (if needed)

#### 2.1 Create API Types

```typescript
// src/api/{domain}/types.ts
export interface XxxReq {
  // Request fields
}

export interface XxxRes extends BaseRes<{
  // Response data
}> {}
```

#### 2.2 Create API Function

```typescript
// src/api/{domain}/index.ts
import axios from '@/shared/lib/axios'
import { type XxxRes } from './types'

export const getXxx = async (): Promise<XxxRes['data']> => {
  const { data } = await axios.get<XxxRes['data']>('/endpoint')
  return data
}
```

#### 2.3 Create BFF Route (if needed)

```typescript
// src/app/api/{endpoint}/route.ts
import { withApiLogging } from '@/shared/lib/api/with-logging'
import { loggedFetch } from '@/shared/lib/fetch/logged-fetch'
import { type NextRequest } from 'next/server'

async function handler(request: NextRequest): Promise<Response> {
  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID()
  // Implementation
  return Response.json(data)
}

export const POST = withApiLogging(handler)
```

#### 2.4 Create React Query Hook

```typescript
// src/hooks/api/{domain}/useXxx.ts
import { getXxx } from '@/api/{domain}'
import { useQuery } from '@tanstack/react-query'
import { type HookOptions } from '@/hooks/types/CustomHooks'

export const useGetXxx = (options?: HookOptions) => {
  return useQuery({
    queryKey: ['{domain}', 'xxx'],
    queryFn: async () => await getXxx(),
    ...options
  })
}
```

### 3. Component Development

#### 3.1 Create Component Structure

- Determine if Server or Client Component
- Place in appropriate directory:
  - Shared: `src/components/shared/{ComponentName}.tsx`
  - Page-specific: `src/components/(pages)/{page}/{ComponentName}.tsx`

#### 3.2 Implement Component

```typescript
// Client Component Example
'use client'

import twMerge from '@/shared/lib/twMerge'
import { useGetXxx } from '@/hooks/api/{domain}/useXxx'

export interface ComponentProps {
  // Props
}

export default function Component({ ...props }: ComponentProps) {
  const { data, isLoading } = useGetXxx()

  return (
    <div className={twMerge('base-classes', props.className)}>
      {/* Component content */}
    </div>
  )
}
```

#### 3.3 Add Styling

- Use Tailwind CSS classes
- Use `twMerge` for dynamic classes
- Follow custom font size pattern: `text-text_XX_XX`
- Add safe area if needed: `pb-safe`, `pt-safe`

### 4. State Management (if needed)

#### 4.1 Create Zustand Store

```typescript
// src/store/useXxxStore.tsx
'use client'

import { create } from 'zustand'

export interface XxxStoreState {
  // State fields
}

export interface XxxStoreFunctions {
  // Functions
}

const initialState: XxxStoreState = {
  // Initial values
}

export const useXxxStore = create<XxxStoreState & XxxStoreFunctions>((set) => ({
  ...initialState
  // Function implementations
}))
```

### 5. Integration

#### 5.1 Add to Page/Route

- Create page in `src/app/{route}/page.tsx`
- Or add to existing page
- Use Parallel Routes if needed (`@Navbar`, `@MenuBar`)

#### 5.2 Add Navigation (if needed)

- Update navigation links
- Add to menu/route configuration

### 6. Error Handling

#### 6.1 Add Error Boundaries

- Use existing `error.tsx` pattern
- Add specific error handling if needed

#### 6.2 Add Loading States

- Use React Query `isLoading`/`isPending`
- Add Skeleton components if needed
- Use Spinner component for global loading

### 7. Testing

#### 7.1 Write Tests

- Component tests
- Hook tests
- API function tests (if needed)

#### 7.2 Manual Testing

- Test on web
- Test on mobile (iOS/Android)
- Test error scenarios
- Test loading states

### 8. Documentation

#### 8.1 Update Code Comments

- Add JSDoc comments for complex functions
- Document component props
- Document API endpoints

### 9. Code Quality

#### 9.1 Run Linters

```bash
yarn lint
yarn type-check
yarn format
```

#### 9.2 Fix Issues

- Fix TypeScript errors
- Fix ESLint warnings
- Format code with Prettier

### 10. Review Checklist

- [ ] Code follows project conventions
- [ ] Types are properly defined
- [ ] Error handling is implemented
- [ ] Loading states are handled
- [ ] Mobile responsive
- [ ] Safe area considered (mobile)
- [ ] No console.logs in production code
- [ ] No `any` types (or properly commented)
- [ ] Tests pass
- [ ] Code is formatted

## Common Patterns

### Form Handling

- Use React Hook Form if complex forms
- Use controlled components for simple forms
- Validate on submit

### Modal/Dialog

- Use `Modal` from `@/shared/headless/Modal`
- Use Portal for rendering

### Toast Messages

- Use `useToast()` hook
- Show success/error messages
- Configure via React Query `meta.showToast`

### Image Loading

- Use `LazyImage` component
- Provide thumbnail and original sizes
- Handle loading states

## Error Prevention

- Always check if component needs `'use client'`
- Always use `twMerge` for className composition
- Always type API responses
- Always handle loading and error states
- Always check mobile compatibility
- Always use proper import paths (`@/`)
