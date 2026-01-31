---
description: 'Yoursaju Web project coding standards and architecture patterns'
alwaysApply: true
---

# Yoursaju Web Project Standards

> **Note**: For detailed architecture overview, libraries, and file structure rules, see `blueprint` rule.

## Project Overview

- **Framework**: Next.js 15.5.9 + React 19.2.3
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Mobile**: Capacitor (iOS/Android)
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Architecture**: BFF Pattern (Backend for Frontend)
- **Package Manager**: Yarn

## File Structure

> **See `file-structure` rule for complete file structure rules, placement guidelines, and naming conventions.**

### Quick Reference

- **API Routes**: `src/app/api/{endpoint}/route.ts`
- **Client API**: `src/api/{domain}/index.ts`
- **Components**: `src/components/{shared|(pages)}/{ComponentName}.tsx`
- **Hooks**: `src/hooks/api/{domain}/useXxx.ts`
- **Stores**: `src/store/useXxxStore.tsx`

## Code Style

### React Components

#### Client Components

- **Always** use `'use client'` directive
- Required for: hooks, event handlers, browser APIs, state

```typescript
'use client'

export default function Component() {
  const [state, setState] = useState()
  // ...
}
```

#### Server Components

- Default (no directive)
- Use for: data fetching, static content

```typescript
export default async function Component() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

#### Props Typing

- Always use `interface` for props
- Extend HTML attributes when needed

```typescript
interface ComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}
```

### Styling

#### Tailwind CSS

- Use utility classes
- Use `twMerge` for dynamic classes

```typescript
import twMerge from '@/shared/lib/twMerge'

className={twMerge(
  'base-class',
  condition && 'conditional-class',
  props.className
)}
```

#### Custom Font Sizes

- Pattern: `text-text_XX_XX`
- Examples: `text-text_16_24`, `text-text_14_20`

#### Safe Area

- Use: `pb-safe`, `pt-safe`, `pb-safe-offset-XX`
- Required for mobile layouts

### Import Rules

#### Path Aliases

- `@/*` → `src/*`
- `public/*` → `public/*`

#### Import Order

1. React and Next.js imports
2. External libraries
3. Internal imports (`@/` paths)
4. Type imports (use `type` keyword)

```typescript
import '@/app/globals.css'

import { type Metadata } from 'next'
import React from 'react'

import Button from '@/components/shared/Button'
import { useAuthStore } from '@/store/useAuthStore'
```

## State Management

See `state-management` rule for detailed patterns.

### Quick Reference

- **Server State**: React Query
- **Client State**: Zustand
- **URL State**: Next.js Router
- **Form State**: React Hook Form (when needed)

## API Patterns

See `api-patterns` rule for detailed patterns.

### Quick Reference

- **BFF Routes**: `src/app/api/{endpoint}/route.ts`
- **Client API**: `src/api/{domain}/index.ts`
- **Types**: `src/api/{domain}/types.ts`
- **Hooks**: `src/hooks/api/{domain}/useXxx.ts`

## Special Rules

### Next.js App Router

- Use Parallel Routes: `@Navbar`, `@MenuBar`
- Use slot props in layouts
- Export HTTP methods: `GET`, `POST`, etc.

### Capacitor

- Check: `window.Capacitor?.isNativePlatform()`
- Platform branching: `platform === 'android' || 'ios'`
- Handle safe area insets

### Environment Variables

- `NEXT_PUBLIC_APP_ENV`: Environment (`local`, `prod`)
- `NEXT_PUBLIC_API_URL`: API URL
- `NEXT_PUBLIC_BUILD_VERSION`: Build version

## Prohibited Practices

- ❌ `console.log` (removed in production)
- ❌ `any` type (use comments if necessary)
- ❌ Hardcoded strings (use constants)
- ❌ Direct `window` access (check `typeof window !== 'undefined'`)

## Error Prevention

### Common Errors

#### Missing 'use client' Directive

- **Symptom**: Hydration errors, "useState is not defined"
- **Solution**: Add `'use client'` at top of file
- **Check**: Uses hooks, browser APIs, or event handlers

#### Type Safety Issues

- **Symptom**: TypeScript errors, runtime errors
- **Solution**: Define proper types, avoid `any`
- **Check**: All functions have return types

#### Import Path Issues

- **Symptom**: Module not found errors
- **Solution**: Use `@/` alias for internal imports
- **Check**: Import paths use correct aliases

## Related Rules

- `blueprint`: Architecture overview and libraries
- `file-structure`: File structure rules and placement guidelines
- `component-patterns`: Component implementation patterns
- `api-patterns`: API integration patterns
- `state-management`: State management patterns
- `mobile-capacitor`: Mobile development patterns
