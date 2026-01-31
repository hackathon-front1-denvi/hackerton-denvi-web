/**
 * 공통 타입 정의
 *
 * 컴포넌트에서 자주 사용하는 Enum 타입들과 API 타입들
 */

import type {
  AuthEmailLoginReqDto,
  AuthEmailRegisterReqDto,
  AuthRefreshReqDto,
  UpdateProfileReqDto,
} from './generated/data-contracts'

// Generated 타입들을 재export
export type { AuthEmailLoginReqDto, AuthEmailRegisterReqDto, AuthRefreshReqDto, UpdateProfileReqDto }

// 앱 설정
export interface AppConfig {
  version: string
  platform: string
  [key: string]: any
}

// 앱 정보
export interface AppInfo {
  version: string
  platform: string
  [key: string]: any
}

// 기본 응답
export interface BaseRes<T = any> {
  ts?: number
  tid?: string
  data: T
  message?: string
  statusCode?: number
  error?: {
    code?: string | number
    message?: string
  }
}
