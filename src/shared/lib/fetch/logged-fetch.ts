import { getLogger } from '@/shared/lib/logger'

export async function loggedFetch(
  requestId: string,
  url: string | URL | Request,
  options: globalThis.RequestInit,
): Promise<Response> {
  const logger = getLogger()

  const headersToLog: Record<string, string> = {}
  if (options.headers != null) {
    new Headers(options.headers).forEach((value, key) => {
      headersToLog[key] = value
    })
  }

  let bodyToLog: unknown = options.body
  if (typeof options.body === 'string') {
    try {
      bodyToLog = JSON.parse(options.body)
    } catch {
      // Not a JSON string, log as is.
    }
  }

  let urlString: string
  if (url instanceof URL) {
    urlString = url.href
  } else if (url instanceof Request) {
    urlString = url.url
  } else {
    urlString = url
  }

  logger.info({
    requestId,
    scope: 'request-fetch',
    method: options.method ?? 'GET',
    url: urlString,
    headers: headersToLog,
    body: bodyToLog,
  })

  const response = await fetch(url, options)

  const logData: Record<string, unknown> = {
    requestId,
    scope: 'response-fetch',
    status: response.status,
  }

  const responseClone = response.clone()
  try {
    logData.body = await responseClone.json()
  } catch {
    // Not a JSON response or empty
  }

  if (response.status >= 500) {
    logger.error(logData)
  } else {
    logger.info(logData)
  }

  return response
}
