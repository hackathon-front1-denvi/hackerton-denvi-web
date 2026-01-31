'use client'

import { useRouter } from '@/navigation'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function GlobalHeader() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <div className="w-full bg-white sticky top-0 z-[100] pt-safe">
      <div className="flex items-center px-4 py-2 h-[60px] gap-3">
        {/* 로고 영역 */}
        <button
          onClick={handleLogoClick}
          className="flex items-center hover:opacity-70 transition-opacity cursor-pointer flex-shrink-0"
          aria-label="홈으로 이동"
        >
          <span className="text-lg font-bold text-black whitespace-nowrap inline-flex items-center gap-1">
            <Image src="/icons/cheonwon-icon.svg" alt="천원" width={20} height={20} className="w-10 h-10" />
            <span className="text-carrot-primary">유어사주</span>
          </span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>
      </div>
    </div>
  )
}
