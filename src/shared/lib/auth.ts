/**
 * OAuth 인증 관련 유틸리티
 */

'use client'

/**
 * OAuth 인증 컨텍스트
 */
export interface AuthContext {
  /** 로그인 후 이동할 경로 */
  next?: string
  /** 레퍼럴 코드 (친구 추천 코드) */
  referredByCode?: string
}

/**
 * OAuth state 파라미터 생성
 * CSRF 방지를 위해 인증 컨텍스트를 state로 인코딩합니다.
 *
 * @param context - 인증 컨텍스트
 * @returns 인코딩된 state 문자열
 *
 * @example
 * ```ts
 * const state = createOAuthState({ next: '/dashboard', referredByCode: 'ABC123' })
 * // 결과: "next=/dashboard&referredByCode=ABC123"
 * ```
 */
export function createOAuthState(context?: AuthContext): string {
  if (!context) return ''

  const params = new URLSearchParams()

  if (context.next && context.next !== '/') {
    params.set('next', context.next)
  }

  if (context.referredByCode) {
    params.set('referredByCode', context.referredByCode)
  }

  return params.toString()
}

/**
 * OAuth state 파라미터 파싱
 * state 문자열에서 인증 컨텍스트를 복원합니다.
 *
 * @param state - 인코딩된 state 문자열
 * @returns 인증 컨텍스트
 *
 * @example
 * ```ts
 * const context = parseOAuthState("next=/dashboard&referredByCode=ABC123")
 * // 결과: { next: '/dashboard', referredByCode: 'ABC123' }
 * ```
 */
export function parseOAuthState(state: string): AuthContext {
  if (!state) return {}

  try {
    const params = new URLSearchParams(decodeURIComponent(state))
    return {
      next: params.get('next') || undefined,
      referredByCode: params.get('referredByCode') || undefined,
    }
  } catch {
    return {}
  }
}
