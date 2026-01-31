import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

    if (!apiUrl) {
      return NextResponse.json({ error: 'API_URL is not configured' }, { status: 500 })
    }

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 })
    }

    // 백엔드 API로 요청 전달
    const response = await fetch(`${apiUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    const data = await response.json()

    if (!response.ok) {
      // 리프레시 토큰이 만료되었으면 쿠키 삭제
      const res = NextResponse.json(data, { status: response.status })
      res.cookies.delete('refreshToken')
      return res
    }

    // 백엔드 응답에서 data.data를 추출하여 반환
    const responseData = data.data || data

    // 새 리프레시 토큰이 있으면 쿠키 업데이트
    const res = NextResponse.json(responseData)

    if (responseData.refresh_token) {
      res.cookies.set('refreshToken', responseData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30일
        path: '/',
      })
    }

    return res
  } catch (error) {
    console.error('Refresh API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
