'use client'

import Close from '@/assets/icons/close.svg'
import { useRouter } from '@/navigation'
import { type ReactNode } from 'react'

interface PageHeaderProps {
  title?: string
  showClose?: boolean
  onClose?: () => void
  rightElement?: ReactNode
}

// 전역 GlobalHeader가 있으므로 상단 바는 제거하고 제목 바만 표시
export default function PageHeader({ title, showClose = false, onClose, rightElement }: PageHeaderProps) {
  const router = useRouter()

  const handleClose = () => {
    if (onClose != null) {
      onClose()
    } else {
      router.back()
    }
  }

  // 제목이 없으면 아무것도 렌더링하지 않음
  if (title == null) {
    return null
  }

  return (
    <div className="w-full bg-white">
      {/* 제목 바 (당근 오렌지 배경) */}
      <div className="bg-gradient-to-r from-[#FF8C42] to-[#FFB366] px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-white">{title}</h1>
        {showClose && (
          <button onClick={handleClose} className="text-white">
            <Close />
          </button>
        )}
        {rightElement}
      </div>
    </div>
  )
}
