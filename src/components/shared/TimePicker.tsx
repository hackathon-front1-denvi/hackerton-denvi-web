'use client'

import { type ChangeEvent, useState } from 'react'

interface TimePickerProps {
  value?: string | null
  onChange?: (value: string | null) => void
  placeholder?: string
  unknownAllowed?: boolean
  onUnknownChange?: (unknown: boolean) => void
}

export default function TimePicker({
  value,
  onChange,
  placeholder = 'HH:MM',
  unknownAllowed = false,
  onUnknownChange,
}: TimePickerProps) {
  const [isUnknown, setIsUnknown] = useState(value == null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value || null)
  }

  const handleUnknownChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsUnknown(checked)
    if (checked) {
      onChange?.(null)
    }
    onUnknownChange?.(checked)
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="time"
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={isUnknown}
        className={`flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg ${isUnknown ? 'bg-gray-100' : ''}`}
      />
      {unknownAllowed && (
        <label className="flex items-center gap-2 whitespace-nowrap">
          <input type="checkbox" checked={isUnknown} onChange={handleUnknownChange} className="w-4 h-4" />
          <span className="text-sm">시간 모름</span>
        </label>
      )}
    </div>
  )
}
