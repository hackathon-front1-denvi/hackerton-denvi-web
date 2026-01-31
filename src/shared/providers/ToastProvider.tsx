'use client'

import { createContext, type ReactNode, useCallback, useMemo, useRef } from 'react'
import { toast as sonnerToast } from 'sonner'

export const Duration = 2000

export interface ToastOptions {
  duration?: number
  id?: string
}

export interface ToastApi {
  success: (message: string, options?: ToastOptions) => void
  info: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
  warning: (message: string, options?: ToastOptions) => void
  clear: () => void
}

function toastId(type: 'success' | 'info' | 'error' | 'warning', message: string) {
  return `${type}-${message}`
}

function createToastFn(
  type: 'success' | 'info' | 'error' | 'warning',
  activeMessages: React.MutableRefObject<Set<string>>,
) {
  return (message: string, options?: ToastOptions) => {
    const id = options?.id ?? toastId(type, message)
    const duration = options?.duration ?? Duration

    switch (type) {
      case 'success':
        sonnerToast.success(message, {
          id,
          duration: duration === Infinity ? undefined : duration,
        })
        break
      case 'info':
        sonnerToast.info(message, {
          id,
          duration: duration === Infinity ? undefined : duration,
        })
        break
      case 'error':
        sonnerToast.error(message, {
          id,
          duration: duration === Infinity ? undefined : duration,
        })
        break
      case 'warning':
        sonnerToast.warning(message, {
          id,
          duration: duration === Infinity ? undefined : duration,
        })
        break
    }

    if (duration === Infinity) return

    activeMessages.current.add(id)
    setTimeout(() => {
      activeMessages.current.delete(id)
      sonnerToast.dismiss(id)
    }, duration * 2)
  }
}

export const ToastContext = createContext<ToastApi | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const activeMessages = useRef(new Set<string>())

  const success = useMemo(() => createToastFn('success', activeMessages), [activeMessages])
  const info = useMemo(() => createToastFn('info', activeMessages), [activeMessages])
  const error = useMemo(() => createToastFn('error', activeMessages), [activeMessages])
  const warning = useMemo(() => createToastFn('warning', activeMessages), [activeMessages])

  const clear = useCallback(() => {
    sonnerToast.dismiss()
    activeMessages.current.clear()
  }, [])

  const api = useMemo<ToastApi>(
    () => ({ success, info, error, warning, clear }),
    [success, info, error, warning, clear],
  )

  return <ToastContext.Provider value={api}>{children}</ToastContext.Provider>
}
