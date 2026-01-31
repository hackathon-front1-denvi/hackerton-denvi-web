---
description: 'Zustand store patterns and React Query usage'
alwaysApply: false
globs: ['src/store/**/*.tsx', 'src/hooks/**/*.ts']
---

# State Management Patterns

## Zustand Store

### Basic Structure

```typescript
'use client'

import { create } from 'zustand'

export interface StoreState {
  field: string
  count: number
}

export interface StoreFunctions {
  setField: (field: string) => void
  increment: () => void
  clearStore: () => void
}

const initialState: StoreState = {
  field: '',
  count: 0
}

export const useXxxStore = create<StoreState & StoreFunctions>((set) => ({
  ...initialState,
  setField: (field: string) => {
    set((prev) => ({ ...prev, field }))
  },
  increment: () => {
    set((prev) => ({ ...prev, count: prev.count + 1 }))
  },
  clearStore: () => {
    set(initialState)
  }
}))
```

### Using Persist Middleware

```typescript
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useXxxStore = create<StoreState & StoreFunctions>()(
  persist(
    (set) => ({
      // State and functions
    }),
    {
      version: 1,
      name: 'store-name',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        // Select only fields to persist
      })
    }
  )
)
```

### Selector Pattern

```typescript
// Select individual field
const field = useXxxStore((s) => s.field)

// Select multiple fields
const { field, count } = useXxxStore((s) => ({
  field: s.field,
  count: s.count
}))

// Select function
const setField = useXxxStore((s) => s.setField)
```

## React Query Patterns

### Query Options

```typescript
export interface HookOptions {
  staleTime?: number
  gcTime?: number
  meta?: {
    showSpinner?: boolean
    showToast?: boolean
  }
  enabled?: boolean
  refetchOnWindowFocus?: boolean
  refetchInterval?: number | false
}
```

### Using Query

```typescript
const { data, isLoading, error, refetch } = useGetXxx({
  meta: { showSpinner: false, showToast: true },
  enabled: condition
})
```

### Using Mutation

```typescript
const { mutate, mutateAsync, isPending } = usePostXxx()

// Usage
mutate(data, {
  onSuccess: (data) => {
    // Success handling
  },
  onError: (error) => {
    // Error handling
  }
})
```

## Provider Patterns

### React Query Provider

- Reference: `src/shared/providers/ReactQueryProvider.tsx`
- Global error handling
- Automatic toast message display

### Toast Provider

- Reference: `src/shared/providers/ToastProvider.tsx`
- Use `useToast()` hook
- `showToast('error' | 'success', message)`

### Theme Provider

- Reference: `src/shared/providers/ThemeProvider.tsx`
- Use `useTheme()` hook

## State Management Principles

1. **Server State**: Use React Query
2. **Client State**: Use Zustand
3. **Form State**: Use React Hook Form (when needed)
4. **URL State**: Use Next.js router

## Store Examples

### Auth Store

- Reference: `src/store/useAuthStore.tsx`
- Access Token management
- User information management
- Logout functionality

### Status App Store

- Reference: `src/store/useStatusAppStore.tsx`
- App configuration management
- Version checking
- Platform information

## Related Rules

- `file-structure`: Store file placement rules
- `api-patterns`: React Query integration patterns
- `libraries`: Zustand and React Query library usage
