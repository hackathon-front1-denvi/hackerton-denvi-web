'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface SettingStore {
  volume: boolean
  setVolume: (volume: boolean) => void
  genieMode: boolean
  setGenieMode: (genieMode: boolean) => void
}

const initialState: Pick<SettingStore, 'volume' | 'genieMode'> = {
  volume: true,
  genieMode: false,
}

export const useSettingStore = create<SettingStore>()(
  persist(
    set => ({
      ...initialState,

      setVolume: volume => {
        set({ volume })
      },

      setGenieMode: genieMode => {
        set({ genieMode })
      },
    }),
    {
      version: 1,
      name: 'setting-store',
      storage: createJSONStorage(() => localStorage), // Next(App Router)에서 SSR 접근 방지
      partialize: s => ({
        volume: s.volume,
        genieMode: s.genieMode,
      }),
    },
  ),
)
