'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from '@/navigation'

export default function Error() {
  const router = useRouter()

  return (
    <div
      id="ErrorBoundaryPage"
      className={`flex bg-[#FFC4D0] h-[100dvh] flex-1 flex-col items-center justify-center bg-black-03 px-5.5`}
    >
      <span className="text-text_22_32 font-bold font-cookierun mb-4">에러가 발생했습니다. 다시 시도해주세요.</span>
      <span className="text-text_22_32 font-bold font-cookierun mb-4">
        지속적인 에러 발생시, 고객센터로 문의해주세요.
      </span>
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
