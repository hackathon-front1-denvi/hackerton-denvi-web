import { type RumPublicApi } from '@datadog/browser-rum-core'

declare global {
  interface Window {
    DD_RUM:
      | {
          version: string
          getInternalContext: RumPublicApi['getInternalContext']
        }
      | undefined
  }
}
