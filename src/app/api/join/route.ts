import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

    if (!apiUrl) {
      return NextResponse.json({ error: 'API_URL is not configured' }, { status: 500 })
    }

    // provider에 따라 엔드포인트와 요청 바디 구성
    let endpoint = '/auth/register/email'
    let requestBody: any = {}

    if (body.provider === 'email') {
      endpoint = '/auth/register/email'
      requestBody = {
        email: body.email,
        password: body.password,
        nickname: body.nickname,
        name: body.name,
      }
    } else if (body.provider === 'kakao') {
      endpoint = '/auth/register/kakao'
      requestBody = {
        accessToken: body.access_token,
        nickname: body.nickname,
      }
    } else if (body.provider === 'apple') {
      endpoint = '/auth/register/apple'
      requestBody = {
        identityToken: body.identity_token,
        nonce: body.nonce,
        nickname: body.nickname,
      }
    }

    // 백엔드 API로 요청 전달
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    // 백엔드 응답에서 data.data를 추출하여 반환
    const responseData = data.data || data

    // 쿠키 설정 (HttpOnly)
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
    console.error('Join API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
