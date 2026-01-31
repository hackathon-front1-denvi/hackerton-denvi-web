'use client'

import Back from '@/assets/icons/back.svg'
import Close from '@/assets/icons/close.svg'
import { useRouter } from '@/navigation'
import { useEffect, useMemo, useState } from 'react'

export enum NavbarIconType {
  Back = 'back',
  Close = 'close',
  None = 'none',
}

interface NavbarProps {
  leftType?: NavbarIconType
  leftElement?: React.ReactNode
  rightType?: NavbarIconType
  title?: React.ReactNode
  onLeft?: () => void
  onRight?: () => Promise<void> | void
  titleColor?: string
  backgroundColor?: string
  sticky?: boolean
  rightElement?: React.ReactNode
}

const BaseNavbar = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <nav className={`flex w-full bg-black-02 ${className ?? ''} pt-safe`}>
      <div className="relative flex h-[60px] w-full items-center justify-between">{children}</div>
    </nav>
  )
}

const BaseNavbarTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 transform">
      <div className="flex items-center justify-center">
        <p className={`truncate text-text_16_24 ${className ?? 'text-black'}`}>{children}</p>
      </div>
    </div>
  )
}

const BaseNavbarIcon = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <div className="flex items-center justify-center gap-6 z-10" onClick={onClick}>
      <div className="cursor-pointer">{children}</div>
    </div>
  )
}

const Navbar = (props: NavbarProps) => {
  const {
    leftType,
    leftElement,
    rightType,
    rightElement,
    title,
    onLeft,
    onRight,
    titleColor = 'text-black',
    backgroundColor,
    sticky,
  } = props
  const router = useRouter()

  const leftIcon = leftType === NavbarIconType.Back ? <Back /> : leftType === NavbarIconType.Close ? <Close /> : null
  const rightIcon = rightType === NavbarIconType.Back ? <Back /> : rightType === NavbarIconType.Close ? <Close /> : null
  const leftContent = leftElement ?? leftIcon
  const rightContent = rightElement ?? rightIcon

  const onLeftClick = () => {
    if (onLeft != null) {
      onLeft()
    } else {
      router.back()
    }
  }

  const onRightClick = async () => {
    if (onRight != null) {
      await onRight()
    }
  }

  // 스크롤 상태 관리
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    if (sticky !== true) {
      return
    }
    const scrollableDiv = document.getElementById('scrollableDiv')
    const handleScroll = () => {
      if (scrollableDiv != null) {
        setIsScrolled(scrollableDiv.scrollTop > 0)
      }
    }
    if (scrollableDiv != null) {
      scrollableDiv.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (scrollableDiv != null) {
        scrollableDiv.removeEventListener('scroll', handleScroll)
      }
    }
  })

  const dynamicBackgroundColor = useMemo(() => {
    const bgColor = backgroundColor ?? 'bg-white'
    if (sticky !== true) {
      return bgColor
    }
    if (isScrolled) {
      return bgColor
    } else {
      return 'bg-transparent'
    }
  }, [sticky, isScrolled, backgroundColor])

  return (
    <BaseNavbar
      className={`z-100 ${dynamicBackgroundColor} ${(sticky ?? false) ? 'fixed max-w-[430px] mx-auto transition-all duration-200' : 'sticky top-0'}`}
    >
      <BaseNavbarIcon onClick={onLeftClick}>{leftContent}</BaseNavbarIcon>
      <BaseNavbarTitle className={`${titleColor}`}>{title}</BaseNavbarTitle>
      {rightContent != null && <BaseNavbarIcon onClick={onRightClick}>{rightContent}</BaseNavbarIcon>}
    </BaseNavbar>
  )
}

export default Navbar
