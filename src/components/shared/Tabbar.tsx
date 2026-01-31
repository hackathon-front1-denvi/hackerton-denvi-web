import NewestIcon from '@/assets/icons/newest.svg'
import { Button } from '@/components/ui/button'
import { useSettingStore } from '@/store/useSettingStore'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef } from 'react'
import Slider, { type SliderRef } from '../Slider'

export const useTabQueryParam = ({ queryKey = 'tab' }: { queryKey: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const value = searchParams.get(queryKey) ?? ''

  const set = useCallback(
    (next: string | null, opts?: { replace?: boolean; scroll?: boolean }) => {
      const sp = new URLSearchParams(searchParams.toString())
      if (next == null) sp.delete(queryKey)
      else sp.set(queryKey, next)

      const url = sp.toString() !== '' ? `${pathname}?${sp}` : pathname
      if (opts?.replace === false) {
        router.push(url, { scroll: opts?.scroll ?? false })
      } else {
        router.replace(url, { scroll: opts?.scroll ?? false })
      }
    },
    [queryKey, pathname, router, searchParams],
  )

  return [value, set] as const
}

interface Tab {
  name: string
  queryKey: string
  hasNew?: boolean
}

interface TabbarProps {
  tabs: Tab[]
  children: React.ReactNode[]
  allowTouchMove?: boolean
}

const Tabbar: React.FC<TabbarProps> = ({ tabs, children, allowTouchMove = true }) => {
  const sliderRef = useRef<SliderRef>(null)
  const [activeQueryKey, setActiveQueryKey] = useTabQueryParam({ queryKey: 'tab' })
  const scrollPositions = useRef<Record<string, number>>({})
  const genieMode = useSettingStore(state => state.genieMode)

  useEffect(() => {
    sliderRef.current?.slideTo(tabs.findIndex(tab => tab.queryKey === activeQueryKey))

    const desiredScroll = scrollPositions.current[activeQueryKey] ?? 0

    window.scrollTo(0, desiredScroll)
  }, [activeQueryKey, tabs])

  const haptic = () => {
    if (!genieMode) return

    // 간단한 햅틱 피드백 구현
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  const handleClick = (index: number) => {
    haptic()
    const newQueryKey = tabs[index].queryKey
    if (activeQueryKey !== newQueryKey) {
      if (activeQueryKey !== '') {
        scrollPositions.current[activeQueryKey] = window.scrollY
      }
      setActiveQueryKey(newQueryKey, { replace: true, scroll: false })
    }
  }

  const handleActiveIndexChange = (index: number) => {
    const newQueryKey = tabs[index].queryKey
    if (activeQueryKey !== newQueryKey) {
      if (activeQueryKey !== '') {
        scrollPositions.current[activeQueryKey] = window.scrollY
      }
      setActiveQueryKey(newQueryKey, { replace: true, scroll: false })
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex w-full bg-white font-bold sticky z-100"
        style={{ top: 'calc(60px + var(--safe-area-inset-top, 0px))' }}
      >
        {tabs.map((tab, index) => {
          const isActive = activeQueryKey === tab.queryKey
          return (
            <Button
              size={isActive ? 'xs' : 'sm'}
              key={index}
              onClick={() => {
                handleClick(index)
              }}
              className={`flex-1 flex items-center justify-center cursor-pointer pt-1 pb-3 px-0 border-b font-normal text-text_15_24 relative ${tab.queryKey === 'review' && 'leading-4'} ${
                isActive ? 'text-black border-black' : 'text-gray-06 border-[#dddddd]'
              }`}
            >
              {tab.name}
              {tab.hasNew === true && <NewestIcon className="absolute top-1 right-4.5" />}
            </Button>
          )
        })}
      </div>
      <Slider
        ref={sliderRef}
        className="flex-1 min-h-0"
        items={children}
        allowTouchMove={allowTouchMove}
        onActiveIndexChange={handleActiveIndexChange}
        activeIndex={tabs.findIndex(tab => tab.queryKey === activeQueryKey)}
        showPagination={false}
        swiperOptions={{
          spaceBetween: 0,
        }}
      />
    </div>
  )
}

export default Tabbar
