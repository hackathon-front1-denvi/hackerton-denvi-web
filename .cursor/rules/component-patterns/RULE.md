---
description: 'React component patterns and examples'
alwaysApply: false
globs: ['**/*.tsx', '**/*.jsx']
---

# Component Patterns

## Basic Component Structure

### Client Component

```typescript
'use client'

import twMerge from '@/shared/lib/twMerge'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  className?: string
}

const Component = forwardRef<HTMLButtonElement, ComponentProps>(
  ({ size, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(baseStyles, sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Component.displayName = 'Component'

export default Component
```

### Server Component

```typescript
import type { ReactNode } from 'react'

interface ServerComponentProps {
  children: ReactNode
}

export default function ServerComponent({ children }: ServerComponentProps) {
  return <div>{children}</div>
}
```

## Shared Component Patterns

### Button Component Example

- Reference: `src/components/shared/Button.tsx`
- Use `forwardRef`
- Merge classes with `twMerge`
- Type-safe props definition

### Layout Component

- Use `LayoutWrapper` for navbar, menubar composition
- Use with Parallel Routes

## Page Component Patterns

### App Router Page

```typescript
import PageComponent from '@/components/(pages)/home/HomePage'

export default function HomeRoutePage() {
  return <PageComponent />
}
```

### Parallel Routes

- Format: `@Navbar/page.tsx`, `@MenuBar/page.tsx`
- Receive via slot props in layout

## Styling Patterns

### Tailwind Classes

- Custom fonts: `text-text_16_24`, `font-cookierun`, etc.
- Safe Area: `pb-safe`, `pt-safe`
- Responsive: `max-w-[430px]` (mobile max width)

### twMerge Usage

```typescript
import twMerge from '@/shared/lib/twMerge'

const className = twMerge('base-class', condition && 'conditional-class', props.className)
```

## Headless Components

- Directory: `src/shared/headless/`
- Examples: Portal, Modal, Toast
- Reusable logic separation

## Related Rules

- `file-structure`: File placement rules for components
- `project-standards`: Code style and conventions
- `libraries`: Tailwind CSS and styling library usage
