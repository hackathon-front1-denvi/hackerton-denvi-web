'use client'

import StickyBottomBar from '@/components/shared/StickyBottomBar'
import { usePathname, useRouter } from '@/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'

interface TabItem {
  label: string
  href: string
  icon: ReactNode
  activeIcon: ReactNode
}

export default function BottomTabbar() {
  const pathname = usePathname()
  const router = useRouter()

  const tabs: TabItem[] = [
    {
      label: '홈',
      href: '/',
      icon: (
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <Image src="/icons/home-icon.svg" alt="홈" width={20} height={20} className="w-5 h-5 opacity-40" />
        </div>
      ),
      activeIcon: (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFB366] flex items-center justify-center">
          <Image src="/icons/home-icon.svg" alt="홈" width={20} height={20} className="w-5 h-5" />
        </div>
      ),
    },
    {
      label: '사주',
      href: '/saju/list',
      icon: (
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <Image src="/icons/rabbit-icon.svg" alt="사주" width={20} height={20} className="w-5 h-5 opacity-40" />
        </div>
      ),
      activeIcon: (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFB366] flex items-center justify-center">
          <Image src="/icons/rabbit-icon.svg" alt="사주" width={20} height={20} className="w-5 h-5" />
        </div>
      ),
    },
    {
      label: '궁합',
      href: '/goonghap/list',
      icon: (
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <Image src="/icons/heart-icon.svg" alt="궁합" width={20} height={20} className="w-5 h-5 opacity-40" />
        </div>
      ),
      activeIcon: (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFB366] flex items-center justify-center">
          <Image src="/icons/heart-icon.svg" alt="궁합" width={20} height={20} className="w-5 h-5" />
        </div>
      ),
    },
    {
      label: '운세',
      href: '/unse',
      icon: (
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <Image src="/icons/star-icon.svg" alt="운세" width={20} height={20} className="w-5 h-5 opacity-40" />
        </div>
      ),
      activeIcon: (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFB366] flex items-center justify-center">
          <Image src="/icons/star-icon.svg" alt="운세" width={20} height={20} className="w-5 h-5" />
        </div>
      ),
    },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/home'
    }
    if (href === '/saju/list') {
      return pathname.startsWith('/saju')
    }
    if (href === '/goonghap/list') {
      return pathname.startsWith('/goonghap')
    }
    if (href === '/unse') {
      return pathname.startsWith('/unse')
    }
    return pathname === href
  }

  return (
    <StickyBottomBar className="z-100">
      <div className="grid grid-cols-4 bg-white border-t border-gray-200 h-full pb-safe">
        {tabs.map(tab => {
          const active = isActive(tab.href)
          return (
            <Link
              href={tab.href}
              key={tab.label}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full py-2 ${
                active ? 'bg-gradient-to-br from-[#FF8C42] to-[#FFB366]' : ''
              }`}
            >
              {active ? tab.activeIcon : tab.icon}
              <span className={`text-text_11_14 ${active ? 'font-bold' : ''}`}>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </StickyBottomBar>
  )
}
