import type { PatientInfo } from '@/store/usePatientStore'

export const PATIENT_LIST: PatientInfo[] = [
  {
    id: 'P-001',
    name: '김하늘',
    birthDate: '1992-04-21',
    gender: 'F',
    takenAt: '2025-12-12',
    history: '2023-09 충치 치료, 2024-03 스케일링',
  },
  {
    id: 'P-002',
    name: '이준호',
    birthDate: '1988-11-03',
    gender: 'M',
    takenAt: '2025-12-11',
    history: '2022-06 임플란트 상담',
  },
  {
    id: 'P-003',
    name: '박지수',
    birthDate: '1997-02-14',
    gender: 'F',
    takenAt: '2025-12-10',
    history: '2024-07 사랑니 발치',
  },
  {
    id: 'P-004',
    name: '정우진',
    birthDate: '1990-08-30',
    gender: 'M',
    takenAt: '2025-12-09',
    history: '2023-12 치주 치료',
  },
  {
    id: 'P-005',
    name: '최서연',
    birthDate: '1995-05-19',
    gender: 'F',
    takenAt: '2025-12-08',
    history: '과거 치료 정보 없음',
  },
]
