---
description: 'API call patterns, BFF structure, error handling, and logging'
alwaysApply: false
globs: ['src/api/**/*.ts', 'src/app/api/**/*.ts', 'src/hooks/api/**/*.ts']
---

# API Patterns and Rules

## BFF (Backend for Frontend) Pattern

### API Route Handler Structure

```typescript
import { withApiLogging } from '@/shared/lib/api/with-logging'
import { loggedFetch } from '@/shared/lib/fetch/logged-fetch'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import { type XxxRes } from '../types'

async function handler(request: NextRequest): Promise<Response> {
  const isDebug = process.env.NEXT_PUBLIC_APP_ENV === 'local'
  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID()

  try {
    // Process request
    const req = await request.json()

    // Call backend API
    const res = await loggedFetch(requestId, `${process.env.NEXT_PUBLIC_API_URL}/endpoint`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: { 'Content-Type': 'application/json' }
    })

    const result: XxxRes = await res.json()

    if (!res.ok) {
      return Response.json(result, { status: res.status })
    }

    // Set cookies (if needed)
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'token',
      value: result.data.token,
      httpOnly: true,
      secure: !isDebug,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365 * 100,
      path: '/'
    })

    return Response.json(result)
  } catch (error) {
    return Response.json(error, { status: 401 })
  }
}

export const POST = withApiLogging(handler)
```

## Client API Functions

### Basic Pattern

```typescript
import axios from '@/shared/lib/axios'
import { type XxxRes } from './types'

export const getXxx = async (): Promise<XxxRes['data']> => {
  const { data } = await axios.get<XxxRes['data']>('/endpoint')
  return data
}

export const postXxx = async (req: XxxReq): Promise<XxxRes['data']> => {
  const { data } = await axios.post<XxxRes['data']>('/endpoint', req)
  return data
}
```

### Type Definitions

```typescript
import { type BaseRes } from '@/api/type'

export interface XxxReq {
  field: string
}

export interface XxxRes extends BaseRes<{
  data: {
    field: string
  }
}> {}
```

## React Query Hook Patterns

### Query Hook

```typescript
import { getXxx } from '@/api/xxx'
import { useQuery } from '@tanstack/react-query'
import { type HookOptions } from '@/hooks/types/CustomHooks'

export const useGetXxx = (options?: HookOptions) => {
  return useQuery({
    queryKey: ['xxx'],
    queryFn: async () => await getXxx(),
    ...options
  })
}
```

### Mutation Hook

```typescript
import { postXxx } from '@/api/xxx'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { type XxxReq, type XxxRes } from '@/api/xxx/types'

export const usePostXxx = (): UseMutationResult<XxxRes['data'], Error, XxxReq> => {
  return useMutation({
    mutationFn: postXxx
  })
}
```

## Error Handling

### Axios Interceptor

- Reference: `src/shared/lib/axios/index.ts`
- Automatic token refresh
- 401 error handling
- BaseRes unwrapping

### React Query Error Handling

- Global error handling in `ReactQueryProvider`
- Control toast messages via `meta.showToast`
- Network error retry logic

## Logging

### API Logging

- `withApiLogging`: API Route Handler logging
- `loggedFetch`: fetch request/response logging
- `getLogger()`: General logging

### Log Levels

- `logger.info()`: General information
- `logger.error()`: Errors
- `logger.warn()`: Warnings
- `logger.debug()`: Debug

## Authentication Patterns

### Token Management

- Access Token: Stored in Zustand store
- Refresh Token: Stored in HTTP-only cookie
- Auto refresh: Handled by Axios interceptor

### Authentication Required APIs

```typescript
// Authorization header automatically added by default
const { data } = await axios.get('/protected-endpoint')

// Public endpoint (no auth required)
const { data } = await axios.get('/public-endpoint', {
  headers: { authRequired: false }
})
```

## Related Rules

- `file-structure`: API file placement rules
- `state-management`: React Query hook patterns
- `libraries`: Axios and HTTP library usage
- `blueprint`: BFF pattern architecture
