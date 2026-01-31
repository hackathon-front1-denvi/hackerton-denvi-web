'use client'

import { create } from 'zustand'

export interface SpinnerStore {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useSpinnerStore = create<SpinnerStore>(set => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {
    setTimeout(() => {
      set({ isLoading })
    }, 0)
  },
}))
