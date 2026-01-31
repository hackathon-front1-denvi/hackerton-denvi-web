import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

    if (apiUrl && refreshToken) {
      // 백엔드 API로 로그아웃 요청 (선택적)
      try {
        await fetch(`${apiUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        })
      } catch (error) {
        console.error('Backend logout error:', error)
        // 백엔드 에러는 무시하고 쿠키 삭제 진행
      }
    }

    // 쿠키 삭제
    const res = NextResponse.json({ data: { success: true } })
    res.cookies.delete('refreshToken')

    return res
  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
