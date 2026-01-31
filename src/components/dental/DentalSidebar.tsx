'use client'

import { usePatientStore } from '@/store/usePatientStore'
import { Activity, Calendar, FileText, Image as ImageIcon, Layers, LayoutGrid, Settings, User } from 'lucide-react'

const DentalSidebar = () => {
  const selectedPatient = usePatientStore(s => s.selectedPatient)

  return (
    <aside className="w-[260px] bg-[#081126] rounded-2xl overflow-hidden shadow-lg flex flex-col text-white/90">
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <defs>
                <linearGradient id="denv-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e6f0ff" />
                  <stop offset="100%" stopColor="#78b3ff" />
                </linearGradient>
              </defs>
              <path
                d="M11 2.2c-3.7 0-6.7 3-6.7 6.7v4.2c0 3.7 3 6.7 6.7 6.7 3.7 0 6.7-3 6.7-6.7V8.9c0-3.7-3-6.7-6.7-6.7zm0 3.1c2 0 3.6 1.6 3.6 3.6v4.2c0 2-1.6 3.6-3.6 3.6-2 0-3.6-1.6-3.6-3.6V8.9c0-2 1.6-3.6 3.6-3.6z"
                fill="url(#denv-grad)"
              />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">DenV AI</div>
            <div className="text-[10px] text-blue-200 font-semibold">PRO</div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="text-[11px] font-semibold text-white/40 tracking-widest">PATIENT INFO</div>
        <div className="mt-3 rounded-2xl bg-[#0f1c36] border border-white/10 p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <User size={16} className="text-blue-200" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{selectedPatient?.name ?? '환자 선택'}</div>
              <div className="text-[11px] text-white/50 mt-1">ID: {selectedPatient?.id ?? 'P-00000'}</div>
              <div className="mt-2 text-[11px] text-white/70 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-blue-300" />
                  {selectedPatient?.birthDate ?? '0000.00.00'}
                </span>
                <span>{selectedPatient ? (selectedPatient.gender === 'M' ? '남' : '여') : '-'}</span>
              </div>
              <div className="text-[11px] text-white/60 mt-1">{selectedPatient?.history ?? '과거 치료 정보 없음'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="text-[11px] font-semibold text-white/40 tracking-widest">VIEW OPTIONS</div>
        <div className="mt-3 flex flex-col gap-2">
          <button className="w-full rounded-xl bg-blue-600/90 hover:bg-blue-600 text-left px-4 py-3 text-xs font-semibold flex items-center gap-2">
            <Layers size={14} />
            AI 분석 켜짐
          </button>
          <button className="w-full rounded-xl bg-blue-600/90 hover:bg-blue-600 text-left px-4 py-3 text-xs font-semibold flex items-center gap-2">
            <ImageIcon size={14} />
            원본 이미지 보기
          </button>
          <button className="w-full rounded-xl bg-blue-600/90 hover:bg-blue-600 text-left px-4 py-3 text-xs font-semibold flex items-center gap-2">
            <FileText size={14} />
            설명/주석 보기
          </button>
        </div>
      </div>

      <div className="px-5 pt-6 text-[11px] font-semibold text-white/40 tracking-widest">SYSTEM</div>
      <div className="mt-3 flex flex-col px-5 pb-5 gap-2">
        <button className="w-full rounded-lg text-left px-3 py-2 text-xs text-white/70 hover:bg-white/5 flex items-center gap-2">
          <LayoutGrid size={14} />
          대시보드
        </button>
        <button className="w-full rounded-lg text-left px-3 py-2 text-xs text-white/70 hover:bg-white/5 flex items-center gap-2">
          <Activity size={14} />
          진단 기록
        </button>
        <button className="w-full rounded-lg text-left px-3 py-2 text-xs text-white/70 hover:bg-white/5 flex items-center gap-2">
          <Settings size={14} />
          설정
        </button>
      </div>

      <div className="flex-1" />
    </aside>
  )
}

export default DentalSidebar
