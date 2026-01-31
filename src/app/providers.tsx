'use client'

import Spinner from '@/components/shared/Spinner'
import { Toaster } from '@/components/ui/sonner'
import MaintenanceProvider from '@/shared/providers/MaintenanceProvider'
import ReactQueryProvider from '@/shared/providers/ReactQueryProvider'
import RefCodeProvider from '@/shared/providers/RefCodeProvider'
import { ThemeProvider } from '@/shared/providers/ThemeProvider'
import { ToastProvider } from '@/shared/providers/ToastProvider'
import React, { type ReactNode } from 'react'

const RootLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main id={'shell'} className="flex flex-col mx-auto w-full shadow-lg bg-white">
      {children}
    </main>
  )
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <RootLayoutWrapper>
        <ToastProvider>
          <ReactQueryProvider>
            <MaintenanceProvider>
              <RefCodeProvider />
              {children}
              <div id="portal"></div>
              <Spinner />
              <Toaster />
            </MaintenanceProvider>
          </ReactQueryProvider>
        </ToastProvider>
      </RootLayoutWrapper>
    </ThemeProvider>
  )
}
