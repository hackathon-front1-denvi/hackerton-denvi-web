import { type BaseRes } from '@/api/type'

/**
 * 성공 응답을 생성합니다.
 * 기존 BaseRes 형식을 유지합니다.
 *
 * @param data - 응답 데이터
 * @param requestId - 요청 ID (선택적)
 * @returns BaseRes 형식의 응답 객체
 */
export function createSuccessResponse<T>(data: T, requestId?: string): BaseRes<T> {
  return {
    ts: Date.now(),
    tid: requestId ?? crypto.randomUUID(),
    data,
  }
}

/**
 * 에러 응답을 생성합니다.
 * 기존 BaseRes 형식을 유지합니다.
 *
 * @param code - 에러 코드
 * @param message - 에러 메시지
 * @param requestId - 요청 ID (선택적)
 * @returns BaseRes 형식의 에러 응답 객체
 */
export function createErrorResponse(code: number, message: string, requestId?: string): BaseRes<null> {
  return {
    ts: Date.now(),
    tid: requestId ?? crypto.randomUUID(),
    data: null,
    error: {
      code,
      message,
    },
  }
}

/**
 * Supabase 에러를 기존 응답 형식으로 변환합니다.
 *
 * @param error - Supabase 에러 객체
 * @param requestId - 요청 ID (선택적)
 * @returns BaseRes 형식의 에러 응답 객체
 */
export function createErrorResponseFromSupabase(
  error: { message?: string; code?: string; details?: string; hint?: string },
  requestId?: string,
): BaseRes<null> {
  const message = error.message || error.details || error.hint || '알 수 없는 오류가 발생했습니다.'
  const code = error.code ? parseInt(error.code, 10) || 500 : 500

  return createErrorResponse(code, message, requestId)
}

/**
 * HTTP 상태 코드와 함께 에러 응답을 반환합니다.
 *
 * @param code - HTTP 상태 코드
 * @param message - 에러 메시지
 * @param requestId - 요청 ID (선택적)
 * @returns Response 객체
 */
export function createErrorResponseWithStatus(code: number, message: string, requestId?: string): Response {
  return Response.json(createErrorResponse(code, message, requestId), { status: code })
}
