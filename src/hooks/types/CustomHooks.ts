export interface HookOptions {
  staleTime?: number
  gcTime?: number
  meta?: {
    showSpinner?: boolean
    showToast?: boolean
  }
  enabled?: boolean
  refetchOnWindowFocus?: boolean // default: true
  refetchInterval?: number | false | ((data: any) => number | false)
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}
