'use client'

import { create } from 'zustand'

export type PredictionPoint = { x: number; y: number }

export type SelectedTooth = {
  id: string
  points: PredictionPoint[]
  bbox: { x: number; y: number; width: number; height: number }
}

interface DentalStore {
  uploadedImage: string | null
  selectedTeeth: SelectedTooth[]
  scenarioType: string | null
  scenarioDetails: string[]
  setUploadedImage: (image: string | null) => void
  setSelectedTeeth: (teeth: SelectedTooth[]) => void
  setScenario: (type: string | null, details: string[]) => void
  reset: () => void
}

const initialState = {
  uploadedImage: null,
  selectedTeeth: [],
  scenarioType: null,
  scenarioDetails: [],
}

export const useDentalStore = create<DentalStore>(set => ({
  ...initialState,
  setUploadedImage: uploadedImage => set({ uploadedImage }),
  setSelectedTeeth: selectedTeeth => set({ selectedTeeth }),
  setScenario: (scenarioType, scenarioDetails) => set({ scenarioType, scenarioDetails }),
  reset: () => set({ ...initialState }),
}))
