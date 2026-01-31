'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/shared/lib/cn'
import { type ChangeEvent } from 'react'

interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: boolean
}

export default function DatePicker({
  value,
  onChange,
  placeholder = 'YYYY-MM-DD',
  required = false,
  error = false,
}: DatePickerProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className="relative">
      <Input
        type="date"
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={cn('w-full px-4 py-3 bg-white border rounded-lg', error ? 'border-red-500' : 'border-gray-300')}
      />
      {required && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xs">필수</span>}
    </div>
  )
}
