'use client'

import Home from '@/assets/icons/menu_home.svg'
import HomeOn from '@/assets/icons/menu_home_on.svg'
import StickyBottomBar from '@/components/shared/StickyBottomBar'
import { env } from '@/shared/lib/env'
import { logEvent } from '@/shared/lib/gtag'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NewestContainer = ({ children, hasNew }: { children: React.ReactNode; hasNew: boolean }) => {
  return (
    <div className="relative flex items-center justify-center px-1.5">
      {children}
      {hasNew && <>new</>}
    </div>
  )
}

export default function MenuBar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleTabClick = async (e: React.MouseEvent, menu: { label: string; href: string }) => {
    e.preventDefault()

    if (menu.label === '뉴스룸') {
      logEvent({ eventName: 'news_enter' })
    }

    const currentVersion = env.app.buildVersion
    if (currentVersion == null) {
      router.push(menu.href)
      return
    }

    try {
      const response = await fetch('/api/version')
      const data = await response.json()
      const serverVersion = data.version as string | null

      router.push(menu.href)
    } catch (error) {
      console.error('Failed to check version:', error)
      router.push(menu.href)
    }
  }

  const menus: Array<{ label: string; href: string; icon: React.ReactNode; activeIcon: React.ReactNode }> = [
    {
      label: 'Home',
      href: '/home',
      icon: (
        <NewestContainer hasNew={false}>
          <Home />
        </NewestContainer>
      ),
      activeIcon: <HomeOn />,
    },
    {
      label: 'Home2',
      href: '/home2',
      icon: (
        <NewestContainer hasNew={false}>
          <Home />
        </NewestContainer>
      ),
      activeIcon: <HomeOn />,
    },
    {
      label: 'Home3',
      href: '/home3',
      icon: (
        <NewestContainer hasNew={false}>
          <Home />
        </NewestContainer>
      ),
      activeIcon: <HomeOn />,
    },
    {
      label: 'Home4',
      href: '/home4',
      icon: (
        <NewestContainer hasNew={false}>
          <Home />
        </NewestContainer>
      ),
      activeIcon: <HomeOn />,
    },
    {
      label: 'Home5',
      href: '/home5',
      icon: (
        <NewestContainer hasNew={false}>
          <Home />
        </NewestContainer>
      ),
      activeIcon: <HomeOn />,
    },
  ]

  return (
    <StickyBottomBar className="z-100">
      <div className="grid grid-cols-5 bg-[#f9f9f9] h-full pb-safe">
        {menus.map(menu => (
          <Link
            href={menu.href}
            key={menu.label}
            className="flex flex-col items-center justify-center gap-2 w-full h-full py-2.5"
            onClick={e => {
              handleTabClick(e, menu).catch(console.error)
            }}
          >
            {menu.href.includes(pathname) ? menu.activeIcon : menu.icon}
            <span className="text-text_11_14">{menu.label}</span>
          </Link>
        ))}
      </div>
    </StickyBottomBar>
  )
}
