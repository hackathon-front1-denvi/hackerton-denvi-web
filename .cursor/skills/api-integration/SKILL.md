---
name: api-integration
description: API Integration
disable-model-invocation: true
---

# API Integration

Use this command when integrating a new API endpoint. Follow the complete workflow from type definition to hook creation.

**Usage**: `/api-integration [endpoint description]`

## API Integration Workflow

### 1. Planning Phase

#### 1.1 Analyze API Requirements

- [ ] Review API documentation
- [ ] Identify request/response structure
- [ ] Determine authentication requirements
- [ ] Check error response format
- [ ] Plan error handling strategy

#### 1.2 Determine Integration Type

- [ ] BFF Route needed? (Backend API → BFF → Client)
- [ ] Direct client API? (Client → Backend API)
- [ ] External API? (Third-party service)

### 2. Type Definition

#### 2.1 Create Request Types

```typescript
// src/api/{domain}/types.ts
import { type BaseRes } from '@/api/type'

export interface XxxReq {
  field1: string
  field2?: number
  // Request fields
}
```

#### 2.2 Create Response Types

```typescript
// src/api/{domain}/types.ts
export interface XxxRes extends BaseRes<{
  data: {
    id: string
    name: string
    // Response fields
  }
}> {}

// For paginated responses
import { type PaginatedRes } from '@/api/type'
export interface XxxListRes extends PaginatedRes<{
  items: XxxItem[]
}> {}
```

### 3. BFF Route Implementation (if needed)

#### 3.1 Create Route Handler

```typescript
// src/app/api/{endpoint}/route.ts
import { withApiLogging } from '@/shared/lib/api/with-logging'
import { loggedFetch } from '@/shared/lib/fetch/logged-fetch'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import { type XxxRes } from '../types'

async function handler(request: NextRequest): Promise<Response> {
  const isDebug = process.env.NEXT_PUBLIC_APP_ENV === 'local'
  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID()

  try {
    const req = await request.json()

    const res = await loggedFetch(requestId, `${process.env.NEXT_PUBLIC_API_URL}/backend-endpoint`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: { 'Content-Type': 'application/json' }
    })

    const result: XxxRes = await res.json()

    if (!res.ok) {
      return Response.json(result, { status: res.status })
    }

    // Handle cookies if needed
    const cookieStore = await cookies()
    if (result.data.token) {
      cookieStore.set({
        name: 'token',
        value: result.data.token,
        httpOnly: true,
        secure: !isDebug,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365 * 100,
        path: '/'
      })
    }

    return Response.json(result)
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const POST = withApiLogging(handler)
```

### 4. Client API Function

#### 4.1 Create API Function

```typescript
// src/api/{domain}/index.ts
import axios from '@/shared/lib/axios'
import { type XxxReq, type XxxRes } from './types'

// GET request
export const getXxx = async (id: string): Promise<XxxRes['data']> => {
  const { data } = await axios.get<XxxRes['data']>(`/endpoint/${id}`)
  return data
}

// POST request
export const createXxx = async (req: XxxReq): Promise<XxxRes['data']> => {
  const { data } = await axios.post<XxxRes['data']>('/endpoint', req)
  return data
}

// PUT request
export const updateXxx = async (id: string, req: Partial<XxxReq>): Promise<XxxRes['data']> => {
  const { data } = await axios.put<XxxRes['data']>(`/endpoint/${id}`, req)
  return data
}

// DELETE request
export const deleteXxx = async (id: string): Promise<void> => {
  await axios.delete(`/endpoint/${id}`)
}
```

#### 4.2 Handle FormData (if needed)

```typescript
export const uploadXxx = async (formData: FormData): Promise<XxxRes['data']> => {
  const { data } = await axios.post<XxxRes['data']>('/endpoint', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data
}
```

### 5. React Query Hook

#### 5.1 Create Query Hook

```typescript
// src/hooks/api/{domain}/useXxx.ts
import { getXxx } from '@/api/{domain}'
import { useQuery } from '@tanstack/react-query'
import { type HookOptions } from '@/hooks/types/CustomHooks'

export const useGetXxx = (id: string, options?: HookOptions) => {
  return useQuery({
    queryKey: ['{domain}', 'xxx', id],
    queryFn: async () => await getXxx(id),
    enabled: !!id && (options?.enabled ?? true),
    ...options
  })
}
```

#### 5.2 Create Mutation Hook

```typescript
import { createXxx } from '@/api/{domain}'
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { type XxxReq, type XxxRes } from '@/api/{domain}/types'
import { useToast } from '@/shared/hooks/useToast'

export const useCreateXxx = (): UseMutationResult<XxxRes['data'], Error, XxxReq> => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: createXxx,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['{domain}'] })
      toast('success', 'Created successfully')
    }
  })
}
```

### 6. Error Handling

- Axios interceptor handles 401 (auto refresh)
- React Query provider handles errors globally
- Use `meta.showToast` to control toast messages

### 7. Testing

#### 7.1 Test API Function

```typescript
import { getXxx } from '@/api/{domain}'
import axios from '@/shared/lib/axios'

jest.mock('@/shared/lib/axios')

describe('getXxx', () => {
  it('fetches data correctly', async () => {
    const mockData = { id: '1', name: 'Test' }
    ;(axios.get as jest.Mock).mockResolvedValue({ data: mockData })

    const result = await getXxx('1')
    expect(result).toEqual(mockData)
  })
})
```

### 8. Integration Checklist

- [ ] Types defined correctly
- [ ] BFF route created (if needed)
- [ ] API function implemented
- [ ] React Query hook created
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Tests written
- [ ] Type safety verified
- [ ] Error scenarios tested

## Common Patterns

### Authentication Required

```typescript
// Axios automatically adds Authorization header
// For public endpoints:
const { data } = await axios.get('/public-endpoint', {
  headers: { authRequired: false }
})
```

### Cache Management

```typescript
// Invalidate cache after mutation
queryClient.invalidateQueries({ queryKey: ['{domain}'] })

// Update cache directly
queryClient.setQueryData(['{domain}', 'xxx', id], newData)
```
