import { type NextRequest } from 'next/server'

/**
 * 요청에서 인증된 사용자 ID를 추출합니다.
 * Authorization 헤더에서 JWT 토큰을 가져와 사용자 정보를 추출합니다.
 *
 * 참고: 실제 토큰 검증은 백엔드 API에서 수행됩니다.
 *
 * @param request - Next.js 요청 객체
 * @returns 사용자 ID 또는 null (인증되지 않은 경우)
 */
export async function getAuthenticatedUserId(request: NextRequest): Promise<number | null> {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)

  // JWT 토큰에서 사용자 ID 추출 (간단한 구현)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.userId || payload.sub || null
  } catch (error) {
    console.error('[Auth] Failed to parse token:', error)
    return null
  }
}

/**
 * 인증이 필요한 엔드포인트를 위한 미들웨어 함수입니다.
 * 인증되지 않은 경우 401 에러를 반환합니다.
 *
 * @param request - Next.js 요청 객체
 * @param handler - 인증된 사용자로 실행할 핸들러 함수
 * @returns Response
 */
export async function requireAuth<T extends { params?: Promise<Record<string, string | string[]>> }>(
  request: NextRequest,
  handler: (request: NextRequest, userId: number, context?: T) => Promise<Response>,
  context?: T,
): Promise<Response> {
  try {
    const userId = await getAuthenticatedUserId(request)

    if (!userId) {
      throw new Error('인증이 필요합니다.')
    }

    return await handler(request, userId, context)
  } catch (error) {
    return Response.json(
      {
        ts: Date.now(),
        tid: request.headers.get('x-request-id') ?? crypto.randomUUID(),
        data: null,
        error: {
          code: 401,
          message: error instanceof Error ? error.message : '인증이 필요합니다.',
        },
      },
      { status: 401 },
    )
  }
}
