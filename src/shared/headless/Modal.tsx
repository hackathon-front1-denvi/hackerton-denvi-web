'use client'
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/shared/lib/cn'
import React, { useEffect } from 'react'

interface ModalPropsInterface {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  backdropClassName?: string
  position?: string
  modalContainerClassName?: string
  modalBoxClassName?: string
  targetId?: string
  closeOnBackdropClick?: boolean
  onClose?: () => void
}

export default function Modal(modalProps: ModalPropsInterface) {
  const {
    children,
    isOpen,
    setIsOpen,
    backdropClassName,
    position,
    modalContainerClassName,
    modalBoxClassName,
    targetId,
    closeOnBackdropClick = true,
    onClose,
  } = modalProps

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  // body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (!open && closeOnBackdropClick) {
          handleClose()
        } else if (!open) {
          // closeOnBackdropClick이 false면 외부 클릭으로 닫히지 않음
          // 하지만 Dialog의 기본 동작을 막기 위해 상태를 유지
          setIsOpen(true)
        }
      }}
    >
      <DialogOverlay className={cn('pb-safe', backdropClassName)} />
      <DialogContent
        className={cn(
          position === 'bottom'
            ? 'fixed bottom-0 left-0 right-0 top-auto translate-x-0 translate-y-0 rounded-t-lg rounded-b-none sm:max-w-full'
            : '',
          modalContainerClassName,
          modalBoxClassName,
        )}
        onInteractOutside={e => {
          if (!closeOnBackdropClick) {
            e.preventDefault()
          }
        }}
        onEscapeKeyDown={e => {
          if (!closeOnBackdropClick) {
            e.preventDefault()
          }
        }}
      >
        <DialogTitle className="sr-only">Modal</DialogTitle>
        <DialogDescription className="sr-only">Modal content</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}
