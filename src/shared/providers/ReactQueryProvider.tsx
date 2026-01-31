'use client'

import { type BaseRes } from '@/api/type'
import { type HookOptions } from '@/hooks/types/CustomHooks'
import { useToast } from '@/shared/hooks/useToast'
import type { ToastApi } from '@/shared/providers/ToastProvider'
import { isServer, QueryCache, QueryClient, QueryClientProvider, type Query } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { isAxiosError, type AxiosError } from 'axios'
import { type ReactNode } from 'react'

interface ProviderProps {
  children: ReactNode
}

const handleRetry = (failureCount: number, error: AxiosError | Error) => {
  const isNetworkError = isAxiosError(error) && error.response == null
  if (isNetworkError) {
    return failureCount < 1
  }
  return false
}

function makeQueryClient(toast: ToastApi) {
  const handleError = (error: AxiosError | Error, query?: Query<unknown, unknown, unknown>) => {
    const showToast: boolean = (query?.meta as HookOptions['meta'])?.showToast ?? true

    if (isAxiosError(error)) {
      const message = (error as AxiosError<BaseRes<unknown>>).response?.data.error?.message
      if (message != null && showToast) {
        toast.error(message)
      }
    } else {
      if (showToast) {
        toast.error(error.message ?? '알 수 없는 오류가 발생했습니다. 다시 시도해주세요')
      }
    }
  }

  return new QueryClient({
    queryCache: new QueryCache({
      onError: handleError,
    }),
    defaultOptions: {
      queries: {
        retry: handleRetry,
        // staleTime: 1000 * 5
      },
      mutations: {
        onError: error => {
          handleError(error)
        },
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient(toast: ToastApi) {
  if (isServer) {
    return makeQueryClient(toast)
  } else {
    browserQueryClient ??= makeQueryClient(toast)
    return browserQueryClient
  }
}

function Provider(props: ProviderProps) {
  const { children } = props
  const toast = useToast()
  const queryClient = getQueryClient(toast)

  return (
    <QueryClientProvider client={queryClient}>
      <>{children}</>
      <>
        {/* On/Off dev mode */}
        <ReactQueryDevtools initialIsOpen={true} />
      </>
    </QueryClientProvider>
  )
}

export default Provider
