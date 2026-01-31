import { getLogger } from '@/shared/lib/logger'
import { type NextRequest } from 'next/server'

// Next.js App Router API Route Handler type
type ApiHandler<T extends { params: Promise<Record<string, string | string[]>> }> = (
  request: NextRequest,
  context: T,
) => Promise<Response>

export function withApiLogging<T extends { params: Promise<Record<string, string | string[]>> }>(
  handler: ApiHandler<T>,
): ApiHandler<T> {
  return async (request, context) => {
    const startTime = Date.now()

    const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID()
    const logger = getLogger()

    // Execute the original handler to get the final response
    const response = await handler(request, context)

    const logData: Record<string, unknown> = {
      requestId,
      scope: 'response',
      status: response.status,
      processingTime: `${Date.now() - startTime}ms`,
    }

    const responseClone = response.clone()
    try {
      logData.body = await responseClone.json()
    } catch {}

    if (response.status >= 500) {
      logger.error(logData)
    } else {
      logger.info(logData)
    }

    return response
  }
}
