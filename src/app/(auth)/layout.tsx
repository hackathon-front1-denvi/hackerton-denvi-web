import type { ReactNode } from 'react'

export default async function AuthLayout({ children }: { children: ReactNode }) {
  // 서버 컴포넌트에서는 쿠키나 헤더를 통해 인증 확인
  // 실제 인증은 클라이언트 사이드에서 처리하므로 레이아웃에서는 기본 렌더링만 수행

  // 참고: 서버 사이드 인증이 필요한 경우, 미들웨어나 API 라우트에서 처리

  return <>{children}</>
}
