import axios from '@/shared/lib/axios'

// 모듈별 API 클래스 import
import { Auth } from './generated/Auth'
import { Health } from './generated/Health'
import { HttpClient } from './generated/http-client'
import { Users } from './generated/Users'
import { Xray } from './generated/Xray'

// src/shared/lib/axios/index.ts의 axios를 사용
// 이미 에러 처리와 toast 표시가 구현되어 있음
const apiAxios = axios

// 커스텀 axios 인스턴스를 사용하는 HttpClient
const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// src/shared/lib/axios/index.ts의 axios 인스턴스로 교체
// 이미 에러 처리와 toast 표시가 구현되어 있음
httpClient.instance = apiAxios as any

// 모듈별 API 인스턴스 생성
export const api = {
  auth: new Auth(httpClient),
  health: new Health(httpClient),
  users: new Users(httpClient),
  xray: new Xray(httpClient),
}

// 타입과 클래스 export
export * from './generated/data-contracts'
export { HttpClient } from './generated/http-client'
