import { env } from '@/shared/lib/env'
import { isValidRedirectUrl } from '@/utils'
import { redirect as nextRedirect, usePathname as nextUsePathname, useRouter as nextUseRouter } from 'next/navigation'
import { useCallback } from 'react'

export { default as Link } from 'next/link'

export const usePathname = nextUsePathname
export const redirect = nextRedirect

export function useRouter() {
  const router = nextUseRouter()

  const back = useCallback(() => {
    const hasReferrer = document.referrer !== ''
    const isExternalReferrer =
      env.app.webappUrl != null && env.app.webappUrl !== '' && !document.referrer.startsWith(env.app.webappUrl)
    const isHistoryEmpty = window.history.length <= 1

    if (isHistoryEmpty) {
      router.push('/saju/list')
    } else if (hasReferrer && isExternalReferrer) {
      router.push('/saju/list')
    } else {
      // 클라이언트 사이드에서 searchParams를 직접 파싱
      const searchParams = new URLSearchParams(window.location.search)
      const backUrl = searchParams.get('backUrl')
      if (backUrl != null && isValidRedirectUrl({ url: backUrl, originUrl: new URL(window.location.href) })) {
        router.push(backUrl)
      } else {
        router.back()
      }
    }
  }, [router])

  return {
    ...router,
    back,
  }
}
