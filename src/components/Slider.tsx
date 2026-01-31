'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { type Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react'

import 'swiper/css'

export interface SliderRef {
  slideTo: (index: number) => void
}

interface SliderProps {
  items: React.ReactNode[]
  className?: string
  allowTouchMove?: boolean
  onActiveIndexChange?: (index: number) => void
  activeIndex?: number
  showPagination?: boolean
  swiperOptions?: SwiperProps
}

const Slider = forwardRef<SliderRef, SliderProps>(
  (
    { items, className, allowTouchMove = true, onActiveIndexChange, activeIndex, showPagination, swiperOptions },
    ref,
  ) => {
    const swiperRef = useRef<SwiperType | null>(null)

    useImperativeHandle(ref, () => ({
      slideTo: (index: number) => {
        swiperRef.current?.slideTo(index)
      },
    }))

    useEffect(() => {
      if (activeIndex !== undefined && swiperRef.current) {
        swiperRef.current.slideTo(activeIndex)
      }
    }, [activeIndex])

    return (
      <Swiper
        className={className}
        allowTouchMove={allowTouchMove}
        onSwiper={swiper => {
          swiperRef.current = swiper
        }}
        onSlideChange={swiper => {
          onActiveIndexChange?.(swiper.activeIndex)
        }}
        {...swiperOptions}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>
    )
  },
)

Slider.displayName = 'Slider'

export default Slider
