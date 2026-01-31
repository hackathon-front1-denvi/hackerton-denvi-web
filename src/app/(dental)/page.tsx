'use client'

import dynamic from 'next/dynamic'

const UploadPage = dynamic(() => import('@/components/dental/UploadPage'), {
  ssr: false,
})

export default function Page() {
  return <UploadPage />
}
