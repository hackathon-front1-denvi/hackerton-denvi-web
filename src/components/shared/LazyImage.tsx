import { env } from '@/shared/lib/env'
import twMerge from '@/shared/lib/twMerge'
import { useState } from 'react'

export interface LazyImageProps {
  src: string
  alt?: string
  originWidth?: number
  originHeight?: number
  thumbnailWidth?: number
  thumbnailHeight?: number
  containerClassName?: string
  className?: string
  hasCover?: boolean
}

export const LazyImage = ({
  src,
  alt,
  originWidth,
  originHeight,
  thumbnailWidth = 30,
  thumbnailHeight,
  containerClassName,
  className,
  hasCover = false,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const originParams: Record<string, string> = {}
  if (originWidth != null) {
    originParams.w = originWidth.toString()
  }
  if (originHeight != null) {
    originParams.h = originHeight.toString()
  }
  const originSrc =
    (src.startsWith('http') || src.startsWith('/_next') ? src : `${env.app.imageUrl}${src}`) +
    (Object.keys(originParams).length > 0 ? `?${new URLSearchParams(originParams).toString()}` : '')

  const thumbnailParams: Record<string, string> = {}
  if (thumbnailWidth != null) {
    thumbnailParams.w = thumbnailWidth.toString()
  }
  if (thumbnailHeight != null) {
    thumbnailParams.h = thumbnailHeight.toString()
  }
  const thumbnailSrc =
    (src.startsWith('http') || src.startsWith('/_next') ? src : `${env.app.imageUrl}${src}`) +
    (Object.keys(thumbnailParams).length > 0 ? `?${new URLSearchParams(thumbnailParams).toString()}` : '')

  // rounded* 토큰만 추출
  const roundedFromContainerClass = (containerClassName?.match(/\b!?rounded(?:-[\w-]+)?\b/g) ?? []).pop() ?? ''
  const roundedFromClass = (className?.match(/\b!?rounded(?:-[\w-]+)?\b/g) ?? []).pop() ?? ''

  return (
    <div className={twMerge(`lazy-img-container relative w-full h-full`, containerClassName)}>
      <div
        className={twMerge(
          `lazy-img-thumbnail bg-cover bg-center w-full h-full object-cover ${!isLoaded ? 'blur-xs' : ''}`,
          className,
        )}
        style={{
          backgroundImage: `url(${thumbnailSrc})`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={twMerge('lazy-img-origin w-full h-full object-cover', className)}
          src={originSrc}
          alt={alt}
          onLoad={() => {
            setIsLoaded(true)
          }}
        />
      </div>
      {hasCover && (
        <div
          className={twMerge(
            `lazy-img-cover absolute top-0 left-0 bg-[#000] w-full h-full opacity-5`,
            roundedFromClass,
            roundedFromContainerClass,
          )}
        ></div>
      )}
    </div>
  )
}
