'use client'

import { Toaster } from '@/components/ui/sonner'

const Toast = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: 'rgba(0, 0, 0, 0.50)',
          color: 'white',
          borderRadius: '32px',
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 400,
          padding: '12px 32px',
          boxShadow: 'none',
          bottom: '100px',
          zIndex: 200,
        },
        classNames: {
          error: 'text-[#EF2222]',
          success: 'text-white',
        },
      }}
    />
  )
}

export default Toast
