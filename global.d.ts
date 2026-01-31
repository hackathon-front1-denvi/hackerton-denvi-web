import { type CapacitorGlobal } from '@capacitor/core'

declare global {
  interface Window {
    Capacitor: CapacitorGlobal
    daum: any
    dataLayer: {
      push: (data: GtmPushPayload) => void
    }
  }
}
