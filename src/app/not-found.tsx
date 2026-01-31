'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from '@/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div id="NotFoundPage" className={`flex h-[100dvh] flex-1 flex-col items-center justify-center bg-black-03 px-5.5`}>
      <span className="text-text_22.32 font-bold font-cookierun mb-4">페이지를 찾을 수 없습니다.</span>
      <Button
        size="sm"
        variant="white"
        className="text-text_16_24 rounded-md font-cookierun"
        onClick={() => {
          router.push('/saju/list')
        }}
      >
        홈페이지로 이동하기
      </Button>
    </div>
  )
}
