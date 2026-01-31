'use client'

import { uploadAndInfer } from '@/api/xrayApi'
import { PATIENT_LIST } from '@/components/dental/patientData'
import { useDentalStore } from '@/store/useDentalStore'
import { usePatientStore, type PatientInfo } from '@/store/usePatientStore'
import { Check, ChevronDown, ChevronRight, Loader2, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Group, Image as KonvaImage, Layer, Line, Rect, Stage } from 'react-konva'
import useImage from 'use-image'

type Prediction = {
  detection_id?: string
  points?: { x: number; y: number }[]
  x: number
  y: number
  width: number
  height: number
}

const SCENARIO_DATA = [
  {
    id: 'S1',
    label: '충치치료',
    subFilters: ['충치 범위 확대', '근관 치료', '치아 발치'],
  },
  {
    id: 'S2',
    label: '치주 치료',
    subFilters: ['골 레벨 감소', '치아 이동', '치근 흡수'],
  },
  {
    id: 'S3',
    label: '임플란트',
    subFilters: ['후방치 근심경사화', '전방치 원심경사화', '수평적 골 흡수'],
  },
  {
    id: 'S4',
    label: '사랑니 발치',
    subFilters: ['인접치 충치', '함치성낭', '치관주위염'],
  },
]

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

const UploadPage = () => {
  const router = useRouter()
  const setUploadedImage = useDentalStore(s => s.setUploadedImage)
  const setSelectedTeeth = useDentalStore(s => s.setSelectedTeeth)
  const setScenario = useDentalStore(s => s.setScenario)
  const selectedPatient = usePatientStore(s => s.selectedPatient)
  const setSelectedPatient = usePatientStore(s => s.setSelectedPatient)

  // UI 상태
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 데이터 및 캔버스 상태
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [image] = useImage(preview ?? '')
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [selectedDetectionIds, setSelectedDetectionIds] = useState<string[]>([])
  const [viewState, setViewState] = useState({
    stageWidth: 0,
    stageHeight: 0,
    imageX: 0,
    imageY: 0,
    scale: 1,
  })

  // 시나리오 계층형 상태
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedSubs, setSelectedSubs] = useState<string[]>([])
  const [selectedScenarioType, setSelectedScenarioType] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // 1. 파일 업로드 시 즉시 AI 분석 실행
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const selectedFile = files[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setPredictions([])
      setSelectedDetectionIds([])

      try {
        const dataUrl = await readFileAsDataUrl(selectedFile)
        setPreview(dataUrl)
        setUploadedImage(dataUrl)
      } catch (error) {
        console.error('이미지 미리보기 생성 실패:', error)
        alert('이미지 미리보기 생성에 실패했습니다.')
        return
      }

      setIsLoading(true)
      try {
        const result = await uploadAndInfer(selectedFile)
        if (result && result.predictions) {
          setPredictions(result.predictions as Prediction[])
        }
      } catch (error) {
        console.error('AI Analysis Error:', error)
        alert('분석 서버 연결에 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  // 2. 캔버스 리사이징 로직
  const fitImageToContainer = () => {
    if (image && containerRef.current) {
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      const s = Math.min((w * 0.95) / image.width, (h * 0.95) / image.height)

      setViewState({
        stageWidth: w,
        stageHeight: h,
        imageX: (w - image.width * s) / 2,
        imageY: (h - image.height * s) / 2,
        scale: s,
      })
    }
  }

  useEffect(() => {
    fitImageToContainer()
    window.addEventListener('resize', fitImageToContainer)
    return () => window.removeEventListener('resize', fitImageToContainer)
  }, [image])

  // 핸들러 함수들
  const toggleSubFilter = (filter: string, scenarioLabel: string) => {
    setSelectedScenarioType(scenarioLabel)
    setSelectedSubs(prev => (prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]))
  }

  const toggleDetection = (id: string) => {
    setSelectedDetectionIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]))
  }

  const handleStartAnalysis = () => {
    if (!file || selectedSubs.length === 0 || selectedDetectionIds.length === 0) {
      alert('이미지 병변과 세부 시나리오를 모두 선택해주세요.')
      return
    }

    setScenario(selectedScenarioType, selectedSubs)

    router.push('/viewer')
  }

  useEffect(() => {
    const selectedTeeth = predictions
      .map((pred, i) => {
        const uid = pred.detection_id || `det-${i}`
        return {
          id: uid,
          points: pred.points || [],
          bbox: {
            x: pred.x,
            y: pred.y,
            width: pred.width,
            height: pred.height,
          },
        }
      })
      .filter(pred => selectedDetectionIds.includes(pred.id))
    setSelectedTeeth(selectedTeeth)
  }, [predictions, selectedDetectionIds, setSelectedTeeth])

  useEffect(() => {
    setScenario(selectedScenarioType, selectedSubs)
  }, [selectedScenarioType, selectedSubs, setScenario])

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="h-14 bg-white border-b flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <span className="text-blue-600 font-bold text-sm">AI 진단 분석</span>
          <span className="text-xs text-gray-400">
            {selectedPatient
              ? `${selectedPatient.name} / ${selectedPatient.birthDate} / ${
                  selectedPatient.gender === 'M' ? '남' : '여'
                } / ${selectedPatient.takenAt}`
              : '환자 정보 이름/생년월일/성별/촬영날짜'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="rounded-full bg-blue-50 text-blue-600 px-2 py-1 font-medium">Inference ID: #0af4429</span>
          {isLoading && (
            <div className="flex items-center gap-2 text-blue-600 font-bold animate-pulse">
              <Loader2 className="animate-spin" size={14} /> 분석 중...
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex p-6 gap-6 max-w-[1600px] mx-auto w-full">
        <PatientSidebar selectedPatient={selectedPatient} patients={PATIENT_LIST} onSelect={setSelectedPatient} />

        {/* LEFT: Canvas Area */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-white bg-[#0a1128] rounded-full px-3 py-1">
              이미지 선택 안내
            </span>
            <span className="text-sm text-gray-500">치료 부위를 클릭해 선택하세요</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1">
            <div className="px-5 py-3 bg-[#eef3f9] border-b border-gray-200 text-xs text-gray-600">
              이미지 범위를 선택하세요
            </div>

            <div ref={containerRef} className="flex-1 bg-[#cfd8e3] relative flex items-center justify-center">
              {!preview ? (
                <div
                  className={`w-full h-full flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isDragging ? 'bg-black/5' : ''
                  }`}
                  onDragOver={e => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={e => {
                    e.preventDefault()
                    setIsDragging(false)
                    handleFiles(e.dataTransfer.files)
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={e => handleFiles(e.target.files)}
                    accept="image/*"
                  />

                  {/* 이미지 없을 때 표시되는 텍스트 (이미지 참조) */}
                  <div className="text-center">
                    <Upload size={44} className="text-gray-600 mx-auto mb-3 opacity-60" />
                    <p className="text-gray-800 font-bold text-xl tracking-tight">이미지 넣을 부분</p>
                    <p className="text-gray-600 text-sm mt-2 font-medium">클릭하거나 파일을 드래그하여 업로드하세요</p>
                  </div>
                </div>
              ) : (
                <>
                  <Stage width={viewState.stageWidth} height={viewState.stageHeight}>
                    <Layer>
                      <Group
                        x={viewState.imageX}
                        y={viewState.imageY}
                        scaleX={viewState.scale}
                        scaleY={viewState.scale}
                      >
                        <KonvaImage image={image} />
                        {predictions.map((pred, i) => {
                          const uid = pred.detection_id || `det-${i}`
                          const active = selectedDetectionIds.includes(uid)
                          const pts = pred.points ? pred.points.flatMap(p => [p.x, p.y]) : []
                          return (
                            <Group key={uid} onClick={() => toggleDetection(uid)}>
                              {pts.length > 0 && (
                                <Line
                                  points={pts}
                                  closed
                                  stroke={active ? '#0065f4' : '#4B5563'}
                                  strokeWidth={2 / viewState.scale}
                                  fill={active ? 'rgba(0, 101, 244, 0.4)' : 'transparent'}
                                />
                              )}
                              <Rect
                                x={pred.x - pred.width / 2}
                                y={pred.y - pred.height / 2}
                                width={pred.width}
                                height={pred.height}
                                stroke={active ? '#0065f4' : '#9CA3AF'}
                                strokeWidth={1 / viewState.scale}
                                dash={[4, 4]}
                              />
                            </Group>
                          )
                        })}
                      </Group>
                    </Layer>
                  </Stage>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#cfd8e3]/80">
                      <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold">
                        <Loader2 className="animate-spin" size={16} />
                        분석 중...
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <ScenarioSidebar
          scenarios={SCENARIO_DATA}
          expandedId={expandedId}
          selectedSubs={selectedSubs}
          isLoading={isLoading}
          canStart={Boolean(file) && selectedSubs.length > 0 && selectedDetectionIds.length > 0}
          onToggleExpand={id => setExpandedId(expandedId === id ? null : id)}
          onToggleSub={toggleSubFilter}
          onStart={handleStartAnalysis}
        />
      </main>
    </div>
  )
}

export default UploadPage

const PatientSidebar = ({
  selectedPatient,
  patients,
  onSelect,
}: {
  selectedPatient: PatientInfo | null
  patients: PatientInfo[]
  onSelect: (patient: PatientInfo) => void
}) => {
  return (
    <aside className="w-[240px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="text-xs font-semibold text-gray-400">환자정보</div>
        <div className="mt-2 rounded-lg bg-gray-50 border border-gray-200 p-3">
          <div className="text-sm font-semibold text-gray-900">{selectedPatient?.name ?? '환자 선택'}</div>
          <div className="text-[11px] text-gray-500 mt-1">
            {selectedPatient
              ? `${selectedPatient.birthDate} / ${selectedPatient.gender === 'M' ? '남' : '여'}`
              : '0000-00-00 / -'}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">{selectedPatient?.history ?? '과거 치료 정보 없음'}</div>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-4">환자목록</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {patients.map(patient => {
          const active = selectedPatient?.id === patient.id
          return (
            <button
              key={patient.id}
              onClick={() => onSelect(patient)}
              className={`w-full text-left px-5 py-4 border-b border-gray-100 transition-colors ${
                active ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${active ? 'text-blue-700' : 'text-gray-900'}`}>
                  {patient.name}
                </span>
                <span className="text-[11px] text-gray-400">{patient.gender === 'M' ? '남' : '여'}</span>
              </div>
              <div className="text-[11px] text-gray-500 mt-1">{patient.birthDate}</div>
              <div className="text-[11px] text-gray-400 mt-1 line-clamp-1">{patient.history}</div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
const ScenarioSidebar = ({
  scenarios,
  expandedId,
  selectedSubs,
  isLoading,
  canStart,
  onToggleExpand,
  onToggleSub,
  onStart,
}: {
  scenarios: {
    id: string
    label: string
    subFilters: string[]
  }[]
  expandedId: string | null
  selectedSubs: string[]
  isLoading: boolean
  canStart: boolean
  onToggleExpand: (id: string) => void
  onToggleSub: (filter: string, scenarioLabel: string) => void
  onStart: () => void
}) => {
  return (
    <div className="w-[360px] flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">진료 시나리오</h2>
        <p className="text-gray-500 text-xs font-medium">세부 진료 항목을 선택해주세요.</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {scenarios.map(scenario => (
          <div key={scenario.id} className="border-b border-gray-100">
            <button
              onClick={() => onToggleExpand(scenario.id)}
              className={`w-full text-left px-6 py-4 transition-colors flex justify-between items-center ${
                expandedId === scenario.id ? 'bg-blue-50/40' : 'hover:bg-gray-50'
              }`}
            >
              <span className={`text-sm font-bold ${expandedId === scenario.id ? 'text-blue-600' : 'text-gray-700'}`}>
                {scenario.label}
              </span>
              {expandedId === scenario.id ? (
                <ChevronDown size={18} className="text-blue-600" />
              ) : (
                <ChevronRight size={18} className="text-gray-400" />
              )}
            </button>

            {expandedId === scenario.id && (
              <div className="bg-gray-50/50 px-6 py-4 flex flex-col gap-2">
                {scenario.subFilters.map(sub => (
                  <button
                    key={sub}
                    onClick={() => onToggleSub(sub, scenario.label)}
                    className={`w-full p-3 text-left text-xs font-bold rounded-lg transition-all flex items-center justify-between ${
                      selectedSubs.includes(sub)
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-300'
                    }`}
                  >
                    <span>{sub}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedSubs.includes(sub) ? 'border-white bg-white' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {selectedSubs.includes(sub) && <Check size={12} className="text-blue-600" />}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <button
          disabled={!canStart || isLoading}
          onClick={onStart}
          className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-md ${
            canStart && !isLoading
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
              : 'bg-[#d1d5db] text-[#4b5563] cursor-not-allowed'
          }`}
        >
          {isLoading ? '분석 중...' : '다음'}
        </button>
      </div>
    </div>
  )
}
