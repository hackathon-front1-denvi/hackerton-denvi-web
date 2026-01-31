'use client'
import { type BaseRes } from '@/api/type'
import { env } from '@/shared/lib/env'
import Axios, { AxiosError } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    _isRetry?: boolean
  }
}

const axios = Axios.create({
  baseURL: env.api.url,
})

axios.interceptors.request.use(config => {
  // authRequired가 false면 인증 헤더를 추가하지 않음
  if (config.headers.authRequired === false) {
    delete config.headers.authRequired
    return config
  }

  delete config.headers.Authorization

  // FormData 인 경우, content-type 제거하고 브라우저에서 자동으로 추정하도록 함
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  return config
})

axios.interceptors.response.use(
  response => {
    // BFF 경로는 이미 변환된 응답이므로 그대로 반환
    const isBFFRoute = response.config.url?.startsWith('/api/')
    if (!isBFFRoute && response.data) {
      // BaseRes 구조인지 확인 ({ data: T } 형태)
      if (typeof response.data === 'object' && 'data' in response.data && response.data.data !== undefined) {
        response.data = (response.data as BaseRes<unknown>).data
      }
      // BaseRes 구조가 아니면 그대로 반환 (이미 직접 객체 형태)
    }
    return response
  },
  async err => {
    if (!(err instanceof AxiosError)) {
      throw err
    }

    const response = err.response

    if (response == null) {
      throw err
    }

    // API 에러는 React Query onError / 컴포넌트 try-catch 에서 useToast 로 처리
    throw err
  },
)

export default axios
