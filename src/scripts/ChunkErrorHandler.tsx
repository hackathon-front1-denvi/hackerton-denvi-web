'use client'

import { datadogLogs } from '@datadog/browser-logs'
import { formatISO } from 'date-fns'
import { useEffect } from 'react'

/**
 * 청크 로딩 에러인지 판단하는 함수
 * @param message - 에러 메시지
 * @param name - 에러 이름
 * @param filename - 에러가 발생한 파일명
 * @returns 청크 에러 여부
 */
function isChunkError(message?: string, name?: string, filename?: string): boolean {
  const errorMessage = (message ?? '').toLowerCase()
  const errorName = (name ?? '').toLowerCase()
  const errorFilename = (filename ?? '').toLowerCase()

  // 1. 청크 로딩 에러의 명확한 시그니처 (ChunkLoadError, 동적 임포트 실패 등)
  if (
    errorName === 'chunkloaderror' ||
    errorMessage.includes('loading chunk') ||
    errorMessage.includes('chunkloaderror') ||
    errorMessage.includes('failed to fetch dynamically imported module') ||
    errorMessage.includes('importing a module script failed') ||
    errorMessage.includes('dynamically imported module')
  ) {
    return true
  }

  // 2. Next.js 청크 파일 경로
  const isNextStaticFile =
    errorFilename.includes('/_next/static/chunks/') ||
    errorFilename.includes('/_next/static/') ||
    errorMessage.includes('/_next/static/chunks/') ||
    errorMessage.includes('/_next/static/')

  if (isNextStaticFile) {
    return true
  }

  // 3. 청크 파일 경로 + 'chunk' 키워드 조합
  if (isNextStaticFile && (errorMessage.includes('chunk') || errorName.includes('chunk'))) {
    return true
  }

  return false
}

/**
 * 페이지를 새로고침하는 함수 (무한 새로고침 방지 로직 포함)
 * @param errorInfo - Datadog에 로깅할 에러 정보
 */
function reloadPageWithThrottle(errorInfo: Record<string, unknown>) {
  const lastReload = sessionStorage.getItem('lastChunkErrorReload')
  const now = Date.now()
  const THROTTLE_TIME = 5 * 1000 // 5초

  if (lastReload === null || now - parseInt(lastReload) > THROTTLE_TIME) {
    sessionStorage.setItem('lastChunkErrorReload', now.toString())
    window.location.reload()
  } else {
    datadogLogs.logger.warn('연속된 청크 에러가 발생했습니다. 새로고침을 중단합니다.', errorInfo)
  }
}

/**
 * ChunkErrorHandler
 *
 * 청크 로딩 에러 처리를 위한 컴포넌트
 * - 배포 후 인스턴스 교체로 인해 이전 빌드의 청크 파일이 서버에 없을 때 발생
 * - CDN에는 존재하지만 서버에는 존재하지 않는 파일 참조 시 에러 처리
 */
export default function ChunkErrorHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const isChunk = isChunkError(event.message, undefined, event.filename)
      if (isChunk) {
        event.preventDefault()

        const errorInfo = {
          errorMessage: event.message,
          errorType: 'ChunkLoadError',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error:
            event.error != null
              ? {
                  name: event.error.name,
                  message: event.error.message,
                  stack: event.error.stack,
                }
              : undefined,
          url: window.location.href,
          timestamp: formatISO(new Date()),
        }

        datadogLogs.logger.error('청크 로딩 에러 감지. 페이지를 새로고침합니다.', errorInfo)
        reloadPageWithThrottle(errorInfo)
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason
      const errorMessage = error == null ? '' : (error.message as string)
      const errorName = error?.name as string

      const isChunk = isChunkError(errorMessage, errorName)
      if (isChunk) {
        event.preventDefault()

        const errorInfo = {
          errorMessage: error?.message,
          errorName: error?.name,
          errorType: 'ChunkLoadError',
          promiseRejection: true,
          error:
            error != null
              ? {
                  name: error.name,
                  message: error.message,
                  stack: error.stack,
                  ...(typeof error === 'object' ? error : {}),
                }
              : undefined,
          url: window.location.href,
          timestamp: formatISO(new Date()),
        }

        datadogLogs.logger.error('청크 로딩 에러 감지 (Promise). 페이지를 새로고침합니다.', errorInfo)
        reloadPageWithThrottle(errorInfo)
      }
    }

    // 전역 에러 핸들러 등록
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // 클린업
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}
