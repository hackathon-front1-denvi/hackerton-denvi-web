---
name: setup-new-feature
description: Setup New Feature
disable-model-invocation: true
---

# Setup New Feature

Use this command to set up the initial structure for a new feature.

**Usage**: `/setup-new-feature [feature name]`

## Feature Setup Workflow

### 1. Feature Planning

#### 1.1 Define Feature Scope

- [ ] Feature name and description
- [ ] User stories/requirements
- [ ] API endpoints needed
- [ ] Components needed
- [ ] State management requirements

#### 1.2 Identify Dependencies

- [ ] Existing components to reuse
- [ ] Existing APIs to extend
- [ ] New dependencies needed
- [ ] Breaking changes

### 2. Create File Structure

#### 2.1 API Structure (if needed)

```
src/api/{feature-domain}/
├── index.ts          # API functions
└── types.ts          # Type definitions
```

#### 2.2 Component Structure

```
src/components/(pages)/{feature-name}/
├── {FeatureName}Page.tsx
└── components/       # Feature-specific components
    └── {ComponentName}.tsx
```

#### 2.3 Hook Structure (if needed)

```
src/hooks/api/{feature-domain}/
└── use{FeatureName}.ts
```

#### 2.4 Store Structure (if needed)

```
src/store/
└── use{FeatureName}Store.tsx
```

### 3. Initialize Files

#### 3.1 Create API Types

```typescript
// src/api/{feature-domain}/types.ts
import { type BaseRes } from '@/api/type'

export interface {FeatureName}Req {
  // Request fields
}

export interface {FeatureName}Res extends BaseRes<{
  // Response data
}> {}
```

#### 3.2 Create API Functions

```typescript
// src/api/{feature-domain}/index.ts
import axios from '@/shared/lib/axios'
import { type {FeatureName}Res } from './types'

export const get{FeatureName} = async (): Promise<{FeatureName}Res['data']> => {
  const { data } = await axios.get<{FeatureName}Res['data']>('/endpoint')
  return data
}
```

#### 3.3 Create React Query Hook

```typescript
// src/hooks/api/{feature-domain}/use{FeatureName}.ts
import { get{FeatureName} } from '@/api/{feature-domain}'
import { useQuery } from '@tanstack/react-query'
import { type HookOptions } from '@/hooks/types/CustomHooks'

export const useGet{FeatureName} = (options?: HookOptions) => {
  return useQuery({
    queryKey: ['{feature-domain}', '{feature-name}'],
    queryFn: async () => await get{FeatureName}(),
    ...options
  })
}
```

#### 3.4 Create Component

```typescript
// src/components/(pages)/{feature-name}/{FeatureName}Page.tsx
'use client'

import twMerge from '@/shared/lib/twMerge'
import { useGet{FeatureName} } from '@/hooks/api/{feature-domain}/use{FeatureName}'

export default function {FeatureName}Page() {
  const { data, isLoading } = useGet{FeatureName}()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={twMerge('container-classes')}>
      {/* Feature content */}
    </div>
  )
}
```

#### 3.5 Create Page Route

```typescript
// src/app/{feature-route}/page.tsx
import {FeatureName}Page from '@/components/(pages)/{feature-name}/{FeatureName}Page'

export default function {FeatureName}RoutePage() {
  return <{FeatureName}Page />
}
```

### 4. Setup Checklist

- [ ] API types created
- [ ] API functions created
- [ ] BFF route created (if needed)
- [ ] React Query hook created
- [ ] Component created
- [ ] Page route created
- [ ] Store created (if needed)
- [ ] Navigation updated (if needed)
- [ ] Tests scaffolded
- [ ] Documentation started

### 5. Next Steps

After setup, use `/feature-development` command to continue implementation.
