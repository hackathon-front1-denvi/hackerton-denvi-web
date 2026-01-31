'use client'

import twMerge from '@/shared/lib/twMerge'
import { useSpinnerStore } from '@/store/useSpinnerStore'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'

export const BaseSpinner = (props: { className?: string }) => {
  const { className } = props
  return (
    <div
      className={`${twMerge('fixed inset-0 z-999 flex items-center justify-center bg-transparent', className)}`}
    ></div>
  )
}

const Spinner = (props: { className?: string }) => {
  const { className } = props
  const { isLoading } = useSpinnerStore()
  const isFetching = useIsFetching({
    predicate: query => {
      return query.meta?.showSpinner === true
    },
  })
  const isMutating = useIsMutating({
    predicate: query => {
      return query.meta?.showSpinner === true
    },
  })
  const showSpinner = isLoading || isFetching + isMutating > 0

  return showSpinner && <BaseSpinner className={className} />
}

export default Spinner
