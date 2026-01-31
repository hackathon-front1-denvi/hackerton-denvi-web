import twMerge from '@/shared/lib/twMerge'

export interface StickyBottomBarProps {
  children: React.ReactNode
  className?: string
}

export default function StickyBottomBar(stickyBottomBarProps: StickyBottomBarProps) {
  const { className, children } = stickyBottomBarProps
  return <div className={twMerge(`sticky bottom-0 max-w-[430px] z-100`, className)}>{children}</div>
}
