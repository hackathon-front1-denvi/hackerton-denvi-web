/**
 * 환경 변수 중앙 관리
 * 모든 환경 변수는 이 파일을 통해 접근합니다.
 */

/**
 * API 설정
 */
export const env = {
  /**
   * 앱 설정
   */
  app: {
    env: process.env.NEXT_PUBLIC_APP_ENV ?? 'unknown',
    url: process.env.NEXT_PUBLIC_APP_URL,
    buildVersion: process.env.NEXT_PUBLIC_BUILD_VERSION,
    webappUrl: process.env.NEXT_PUBLIC_WEBAPP_URL,
    imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL,
  },

  /**
   * 외부 서비스 설정
   */
  services: {
    gtm: {
      id: process.env.NEXT_PUBLIC_GTM_ID,
    },
    n8n: {
      webhookUrl: process.env.N8N_WEBHOOK_URL,
    },
  },

  /**
   * API 서버 설정
   */
  api: {
    url: process.env.NEXT_PUBLIC_API_URL,
  },

  /**
   * 유틸리티 함수
   */
  isProd: () => env.app.env === 'prod',
  isDev: () => env.app.env === 'dev' || env.app.env === 'development',
  isLocal: () => env.app.env === 'local',
} as const

/**
 * 필수 환경 변수 검증
 * 개발 환경에서만 실행됩니다.
 */
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  const required = [{ key: 'API_URL or NEXT_PUBLIC_API_URL', value: env.api.url }]

  const missing = required.filter(({ value }) => !value)

  if (missing.length > 0) {
    console.warn('⚠️  필수 환경 변수가 설정되지 않았습니다:', missing.map(({ key }) => key).join(', '))
  }
}
