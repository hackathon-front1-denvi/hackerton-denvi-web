import { getLogger } from '@/shared/lib/logger'
import { type NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const requestId = crypto.randomUUID()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-request-id', requestId)

  const logger = getLogger()
  const { pathname, search } = request.nextUrl

  const headersToLog = {
    referer: request.headers.get('referer'),
    origin: request.headers.get('origin'),
    'content-type': request.headers.get('content-type'),
    'accept-language': request.headers.get('accept-language'),
  }

  const cookiesToLog = Object.fromEntries(request.cookies.getAll().map(cookie => [cookie.name, cookie.value]))

  const logData: Record<string, unknown> = {
    requestId,
    scope: 'request',
    method: request.method,
    path: `${pathname}${search}`,
    ip: (request as NextRequest & { ip?: string }).ip ?? request.headers.get('x-forwarded-for'),
    userAgent: request.headers.get('user-agent'),
    headers: headersToLog,
    cookies: cookiesToLog,
  }

  const requestClone = request.clone()
  try {
    logData.body = await requestClone.json()
  } catch {}

  logger.info(logData)

  // 페이지 라우트인 경우 pathname을 헤더로 전달
  if (!pathname.startsWith('/api')) {
    requestHeaders.set('x-pathname', pathname)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
