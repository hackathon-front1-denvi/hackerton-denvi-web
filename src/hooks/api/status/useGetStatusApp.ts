import { api } from '@/api/client'
import { type AppInfo } from '@/api/type'
import { useQuery } from '@tanstack/react-query'
import { type HookOptions } from '../../types/CustomHooks'

const getStatusApp = async (): Promise<AppInfo> => {
  const response = await api.health.appControllerHealth({ format: 'json' })
  const data = response.data as any

  // Health check는 단순 문자열을 반환할 수 있음
  if (typeof data === 'string') {
    return { version: 'unknown', platform: 'unknown' } as AppInfo
  }

  return data as AppInfo
}

export const useGetStatusApp = (options?: HookOptions) => {
  return useQuery({
    queryKey: ['status/app'],
    queryFn: getStatusApp,
    ...options,
  })
}
