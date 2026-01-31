import { ToastContext, type ToastApi } from '@/shared/providers/ToastProvider'
import { useContext } from 'react'

export const useToast = (): ToastApi => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('ToastProvider is not defined.')
  }
  return context
}

export const useClearToast = (): ToastApi['clear'] => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('ToastProvider is not defined.')
  }
  return context.clear
}
