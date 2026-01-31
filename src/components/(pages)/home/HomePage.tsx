'use client'

import BottomTabbar from '@/components/shared/BottomTabbar'
import Slider, { type SliderRef } from '@/components/Slider'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Autoplay } from 'swiper/modules'

const banners = [
  {
    imageSrc: '/images/invitation_banner.png',
    alt: '친구 초대 이벤트 배너',
  },
  {
    imageSrc: '/images/join_event_banner.png',
    alt: '가입 이벤트 배너',
  },
]

const valuePoints = [
  '명리학 사주팔자 기반 정통 해석',
  '가격은 1000원, 해석은 프리미엄급',
  '내 사주에 꼭 맞춘 개인화 결과',
  '사용자가 먼저 증명한 높은 적중도',
]

const reviews = ['사주 어플만 20개인데, 이중에 제일 잘맞네요', '가격도 싼데 5만원짜리 사주보다 나아요']

const steps = ['생년월일·출생시간 입력', '1000원 결제', '나만을 위한 사주 결과 확인']

export default function HomePage() {
  const router = useRouter()
  const [activeBanner, setActiveBanner] = useState(0)
  const bannerSliderRef = useRef<SliderRef | null>(null)
  const [isThousandWon, setIsThousandWon] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsThousandWon(prev => !prev)
    }, 2600)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <div className="min-h-screen bg-[#F9F3E7] pb-24 text-[#1E1B16]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F9F3E7] pb-16 pt-0">
          <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-[#FBD38D]/50 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[#FCA5A5]/40 blur-3xl" />

          <div className="w-full">
            {/* Event banner carousel */}
            <div className="relative w-full overflow-hidden">
              <Slider
                ref={bannerSliderRef}
                items={banners.map(banner => (
                  <div key={banner.imageSrc} className="w-full">
                    <Image
                      src={banner.imageSrc}
                      alt={banner.alt}
                      width={1600}
                      height={520}
                      className="h-auto w-full object-cover"
                      priority
                    />
                  </div>
                ))}
                onActiveIndexChange={setActiveBanner}
                swiperOptions={{
                  modules: [Autoplay],
                  autoplay: { delay: 4000, disableOnInteraction: false },
                  rewind: true,
                }}
              />
              <div className="absolute bottom-4 right-6 flex items-center gap-2">
                {banners.map((_, index) => (
                  <button
                    key={`banner-dot-${index}`}
                    onClick={() => bannerSliderRef.current?.slideTo(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeBanner === index ? 'w-6 bg-[#B45309]' : 'w-2.5 bg-[#E3C8A3]'
                    }`}
                    aria-label={`배너 ${index + 1}로 이동`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-5xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[#B45309] ring-1 ring-[#EAD6B8]">
                  카톡 리뷰에서 증명된 가성비 최고 사주 앱
                </div>
                <h1 className="text-3xl font-black leading-tight text-[#1E1B16] sm:text-4xl">
                  사주 너무 비싸고 뻔해요?
                  <br />
                  천원으로 왠만한 5만원 사주보댜 잘봐요!
                </h1>
                <p className="mt-4 text-base text-[#6B5E4B]">
                  명리학 사주팔자 기반으로 정확하게. 가격은 가볍게, 만족은 진하게.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <Button
                    onClick={() => router.push('/saju/list')}
                    className="h-12 rounded-2xl bg-[#B45309] text-white hover:bg-[#9C3D05]"
                  >
                    사주보기
                  </Button>
                  <Button
                    onClick={() => router.push('/goonghap/list')}
                    variant="outline"
                    className="h-12 rounded-2xl border-[#B45309] text-[#B45309] hover:bg-[#FFF5E9]"
                  >
                    궁합보기
                  </Button>
                  <Button
                    onClick={() => router.push('/unse')}
                    variant="outline"
                    className="h-12 rounded-2xl border-[#B45309] text-[#B45309] hover:bg-[#FFF5E9]"
                  >
                    운세보기
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full">
                  <AnimatePresence mode="wait">
                    {isThousandWon ? (
                      <motion.div
                        key="thousand"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.45 }}
                        className="relative"
                      >
                        <Image
                          src="/images/real_1000_won.webp"
                          alt="천원 지폐"
                          width={520}
                          height={240}
                          className="h-auto w-full rounded-2xl object-cover shadow-sm"
                          priority
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[clamp(56px,18vw,120px)] font-semibold text-[#22C55E] drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]">
                            O
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="fifty"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.45 }}
                        className="relative"
                      >
                        <Image
                          src="/images/real_50000_won.png"
                          alt="오만원 지폐"
                          width={520}
                          height={240}
                          className="h-auto w-full rounded-2xl object-cover shadow-sm"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[clamp(56px,18vw,120px)] font-semibold text-[#EF4444] drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]">
                            X
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="w-full rounded-2xl border border-[#EAD6B8] bg-white/80 p-4 text-sm text-[#6B5E4B]">
                  카톡 리뷰에서 증명된 “가성비 최고” 사주 앱
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-black text-[#1E1B16]">비싼 사주, 늘 망설여지지 않나요?</h2>
            <p className="mt-4 text-base leading-relaxed text-[#6B5E4B]">
              5만원짜리 사주는 부담스럽고, 무료 운세는 뭔가 부족할 때.
              <br />딱 1000원으로 제대로 보는 사주가 필요했습니다.
            </p>
            <div className="mt-6 flex items-center justify-center rounded-3xl border border-[#EAD6B8] bg-[#FFF7EC] p-5">
              <Image
                src="/images/real_50000_won.png"
                alt="오만원 지폐"
                width={320}
                height={150}
                className="h-auto w-full max-w-[300px] rounded-2xl object-cover shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Value */}
        <section className="bg-[#FFF6E7] px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-black text-[#1E1B16]">“1000원 사주”가 딱 맞는 이유</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {valuePoints.map(point => (
                <div
                  key={point}
                  className="rounded-2xl border border-[#EAD6B8] bg-white/90 p-5 text-sm font-semibold text-[#4A3B2A] shadow-[0_10px_25px_rgba(180,83,9,0.12)]"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#1E1B16]">실제 사용자들이 먼저 말했어요</h2>
                <p className="mt-3 text-sm text-[#6B5E4B]">수많은 사주 앱 중에서도 “제일 잘 맞는다”는 선택</p>
              </div>
              <div className="flex h-20 w-full items-center justify-center rounded-2xl border border-dashed border-[#E7D3B4] bg-[#FFF5E9] text-xs font-semibold text-[#B45309] lg:w-56">
                이미지: 카톡
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {reviews.map(review => (
                <div
                  key={review}
                  className="rounded-3xl border border-[#EAD6B8] bg-[#FFFDF7] p-6 text-sm text-[#4A3B2A] shadow-[0_18px_40px_rgba(180,83,9,0.1)]"
                >
                  “{review}”
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 1000 won emphasis */}
        <section className="bg-[#F9F3E7] px-6 py-14">
          <div className="mx-auto max-w-5xl rounded-3xl border border-[#E7D3B4] bg-[#FFF5E9] p-8 text-center shadow-[0_25px_60px_rgba(180,83,9,0.15)]">
            <h2 className="text-2xl font-black text-[#1E1B16]">천원 한 장으로, 마음이 편해집니다</h2>
            <p className="mt-4 text-base text-[#6B5E4B]">
              한국 지폐 천원 이미지와 함께 “부담 없이 시작해보세요” 메시지 강조
            </p>
            <div className="mt-6 flex items-center justify-center">
              <Image
                src="/images/real_1000_won.webp"
                alt="천원 지폐"
                width={360}
                height={170}
                className="h-auto w-full max-w-[340px] rounded-2xl object-cover shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Video */}
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-black text-[#1E1B16]">답변 2분 완성</h2>
            <p className="mt-3 text-base text-[#6B5E4B]">간단한 입력 후 2분 안에 결과를 확인할 수 있어요</p>
            <div className="mt-6 aspect-video w-full rounded-3xl border border-[#EAD6B8] bg-[#FFF7EC] shadow-[0_20px_45px_rgba(180,83,9,0.12)]">
              <div className="flex h-full w-full flex-col items-center justify-center text-sm font-semibold text-[#B45309]">
                영상: 입력~답변까지
                <span className="mt-2 text-xs text-[#C79B6D]">여기에 영상 임베드</span>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="bg-[#FFF6E7] px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-black text-[#1E1B16]">딱 3단계면 끝</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-[#EAD6B8] bg-white/90 p-6 text-center shadow-[0_12px_24px_rgba(180,83,9,0.12)]"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#B45309] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold text-[#4A3B2A]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#1E1B16] px-6 py-16 text-white">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-black">지금 1000원으로 시작하세요</h2>
            <p className="mt-3 text-sm text-[#F2E7D2]">가볍게 시작했는데, 결과가 놀라운 사주</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Button
                onClick={() => router.push('/saju/list')}
                className="h-12 rounded-2xl bg-[#FBBF24] text-[#1E1B16] hover:bg-[#F59E0B]"
              >
                사주보기
              </Button>
              <Button
                onClick={() => router.push('/goonghap/list')}
                variant="outline"
                className="h-12 rounded-2xl border-white/60 text-white hover:bg-white/10"
              >
                궁합보기
              </Button>
              <Button
                onClick={() => router.push('/unse')}
                variant="outline"
                className="h-12 rounded-2xl border-white/60 text-white hover:bg-white/10"
              >
                운세보기
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0F0D0B] px-6 py-10 text-[#C9B79C]">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
              <div>
                <h3 className="text-lg font-bold text-white">유어사주</h3>
                <div className="mt-4 space-y-2 text-xs">
                  <p>대표: 김철기</p>
                  <p>사업자등록번호: 659-26-01816</p>
                  <p>통신판매업번호: 통신판매업 2023서울강남04966</p>
                  <p>주소: 경기도 안산시 단원구 광덕서로 54, 2층 203호 J41호(고잔동, 종로프라자)</p>
                  <p>이메일: support@denvi.com</p>
                  <p>전화번호: 010-2158-7799</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 text-xs text-[#9F8B6D]">
              <div>© 2025 MindWise AI LLC</div>
              <div className="flex flex-col gap-2">
                <Link href="/about" className="hover:text-white">
                  회사소개
                </Link>
                <Link href="/terms" className="hover:text-white">
                  이용약관
                </Link>
                <Link href="/privacy" className="hover:text-white">
                  개인정보 처리방침
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <BottomTabbar />
    </>
  )
}
