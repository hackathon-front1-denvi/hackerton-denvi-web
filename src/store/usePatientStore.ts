'use client'

import { create } from 'zustand'

export type PatientInfo = {
  id: string
  name: string
  birthDate: string
  gender: 'M' | 'F'
  takenAt: string
  history: string
}

interface PatientStore {
  selectedPatient: PatientInfo | null
  setSelectedPatient: (patient: PatientInfo) => void
  clearSelectedPatient: () => void
}

export const usePatientStore = create<PatientStore>(set => ({
  selectedPatient: null,
  setSelectedPatient: patient => set({ selectedPatient: patient }),
  clearSelectedPatient: () => set({ selectedPatient: null }),
}))
