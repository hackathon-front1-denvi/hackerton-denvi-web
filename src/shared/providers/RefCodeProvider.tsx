'use client'

import { useEffect } from 'react'

const RefCodeProvider = () => {
  useEffect(() => {
    // 클라이언트 사이드에서 searchParams를 직접 파싱
    const searchParams = new URLSearchParams(window.location.search)
    const refCode = searchParams.get('refCode')
    if (refCode != null) {
      sessionStorage.setItem('refCode', refCode)
    }
  }, [])

  return null
}

export default RefCodeProvider
