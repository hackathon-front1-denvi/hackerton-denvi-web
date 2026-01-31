'use client'

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

export interface ThemeContextValue {
  theme: 'light' | 'dark'
  isReady: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const useTheme = (): ThemeContextValue | undefined => {
  const context = useContext(ThemeContext)
  return context
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState<'light' | 'dark'>('light')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  const value: ThemeContextValue = { theme, isReady }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
