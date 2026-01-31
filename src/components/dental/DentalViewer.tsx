'use client'

import { useDentalStore } from '@/store/useDentalStore'
import { usePatientStore } from '@/store/usePatientStore'
import { useEffect, useMemo, useRef, useState } from 'react'

const DentalViewer = () => {
  const selectedTeeth = useDentalStore(s => s.selectedTeeth)
  const scenarioType = useDentalStore(s => s.scenarioType)
  const uploadedImage = useDentalStore(s => s.uploadedImage)
  const selectedPatient = usePatientStore(s => s.selectedPatient)

  // 상태 관리: 단일 ID가 아닌 배열로 변경
  const normalizedType = useMemo(() => {
    const fallback = '구강건강'
    return (scenarioType ?? fallback).replace(/\s+/g, '')
  }, [scenarioType])

  const fallbackXrayBefore = `/images/xray_전_${normalizedType}.png`
  const xrayBefore = uploadedImage ?? fallbackXrayBefore
  const xrayAfter = `/images/xray_후_${normalizedType}.png`
  const clinicalBefore = `/images/임상_전_${normalizedType}.png`
  const clinicalAfter = `/images/임상_후_${normalizedType}.png`
  const afterLoadDelay = useMemo(
    () => ({
      xray: 3000 + Math.floor(Math.random() * 2000),
      clinical: 3000 + Math.floor(Math.random() * 2000),
    }),
    [normalizedType],
  )

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="h-14 bg-white border-b flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <span className="text-blue-600 font-bold text-sm">AI 진단 분석</span>
          <span className="text-xs text-gray-400">환자 구강건강 시나리오</span>
        </div>
        <div className="text-xs text-gray-500">Inference ID: #0af4429</div>
      </header>

      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="mb-6">
          <p className="text-gray-400 font-medium text-sm">Step 3</p>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {selectedPatient?.name
              ? `${selectedPatient.name}님의 구강건강 시나리오 입니다`
              : 'OO님의 구강건강 시나리오 입니다'}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            이해를 돕기 위한 의학적 시뮬레이션입니다. 실제 진행 과정과 다를 수 있으니 참고용으로만 이해해주세요.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <ImagePanel title="현재" src={xrayBefore} overlayTeeth={selectedTeeth} />
          <ImagePanel
            title="악화 진행 후"
            src={xrayAfter}
            note="AI로 생성된 이미지입니다."
            delayMs={afterLoadDelay.xray}
          />
          <ImagePanel title="임상 전" src={clinicalBefore} />
          <ImagePanel
            title="임상 후"
            src={clinicalAfter}
            note="AI로 생성된 이미지입니다."
            delayMs={afterLoadDelay.clinical}
          />
        </div>
      </main>
    </div>
  )
}

export default DentalViewer

const ImagePanel = ({
  title,
  src,
  note,
  overlayTeeth,
  delayMs,
}: {
  title: string
  src: string
  note?: string
  overlayTeeth?: {
    id: string
    points: { x: number; y: number }[]
    bbox: { x: number; y: number; width: number; height: number }
  }[]
  delayMs?: number
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [viewState, setViewState] = useState({ width: 0, height: 0, x: 0, y: 0, scale: 1 })
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isDelayDone, setIsDelayDone] = useState(delayMs === undefined)

  useEffect(() => {
    const img = new Image()
    setIsImageLoaded(false)
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height })
      setIsImageLoaded(true)
    }
    img.src = src
  }, [src])

  useEffect(() => {
    const fit = () => {
      if (!containerRef.current || imageSize.width === 0 || imageSize.height === 0) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      const scale = Math.min((w * 0.95) / imageSize.width, (h * 0.95) / imageSize.height)
      setViewState({
        width: w,
        height: h,
        x: (w - imageSize.width * scale) / 2,
        y: (h - imageSize.height * scale) / 2,
        scale,
      })
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [imageSize])

  useEffect(() => {
    if (delayMs === undefined) {
      setIsDelayDone(true)
      return
    }
    setIsDelayDone(false)
    const timer = window.setTimeout(() => setIsDelayDone(true), delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs, src])

  const shouldShowImage = isImageLoaded && isDelayDone
  const shouldShowLoader = delayMs !== undefined && !shouldShowImage

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 text-xs text-gray-600 font-semibold">{title}</div>
      <div ref={containerRef} className="relative bg-[#cfd8e3] h-[220px] overflow-hidden">
        {shouldShowImage && (
          <>
            <img
              src={src}
              alt={title}
              className="absolute"
              style={{
                left: viewState.x,
                top: viewState.y,
                width: imageSize.width * viewState.scale,
                height: imageSize.height * viewState.scale,
              }}
            />
            {overlayTeeth && overlayTeeth.length > 0 && (
              <svg className="absolute left-0 top-0" width={viewState.width} height={viewState.height}>
                {overlayTeeth.map((tooth, index) => {
                  const color = ['#ef4444', '#f97316', '#3b82f6', '#22c55e'][index % 4]
                  if (tooth.points && tooth.points.length > 0) {
                    const points = tooth.points
                      .map(p => `${p.x * viewState.scale + viewState.x},${p.y * viewState.scale + viewState.y}`)
                      .join(' ')
                    return <polygon key={tooth.id} points={points} fill={`${color}33`} stroke={color} strokeWidth={2} />
                  }
                  const { x, y, width, height } = tooth.bbox
                  const rectX = (x - width / 2) * viewState.scale + viewState.x
                  const rectY = (y - height / 2) * viewState.scale + viewState.y
                  return (
                    <rect
                      key={tooth.id}
                      x={rectX}
                      y={rectY}
                      width={width * viewState.scale}
                      height={height * viewState.scale}
                      fill={`${color}33`}
                      stroke={color}
                      strokeWidth={2}
                      strokeDasharray="6 4"
                    />
                  )
                })}
              </svg>
            )}
          </>
        )}
        {shouldShowLoader && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#cfd8e3]/80">
            <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold">
              <span className="h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
              분석 중...
            </div>
          </div>
        )}
      </div>
      {note && <div className="px-4 py-2 text-[11px] text-gray-400">{note}</div>}
    </div>
  )
}
