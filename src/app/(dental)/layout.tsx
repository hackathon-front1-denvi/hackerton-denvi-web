import DentalSidebar from '@/components/dental/DentalSidebar'
import type { ReactNode } from 'react'

export default function DentalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen bg-[#e7eef7] font-sans text-gray-900">
      <div className="px-4 py-6">
        <DentalSidebar />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
