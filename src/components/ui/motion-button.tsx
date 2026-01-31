import { motion, useReducedMotion, type MotionProps } from 'framer-motion'
import * as React from 'react'

import { buttonVariants, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/shared/lib/cn'

type MotionButtonProps = Omit<ButtonProps, 'asChild'> &
  MotionProps & {
    unstyled?: boolean
    continuous?: boolean
  }

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, size, rounded, bottomSafe, unstyled = false, continuous = false, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()

    const safeAreaClasses = bottomSafe
      ? size === 'xs'
        ? 'pb-safe-offset-1 pt-1'
        : size === 'sm'
          ? 'pb-safe-offset-[0.5625rem] pt-2.25'
          : size === 'md'
            ? 'pb-safe-offset-[0.8125rem] pt-3.25'
            : size === 'lg'
              ? 'pb-safe-offset-4 pt-4'
              : size === 'xl'
                ? 'pb-safe-offset-[0.9375rem] pt-3.75'
                : ''
      : ''

    const baseClassName = unstyled
      ? className
      : cn(buttonVariants({ variant, size, rounded, bottomSafe, className }), safeAreaClasses)

    const motionProps: MotionProps = prefersReducedMotion
      ? {}
      : {
          whileHover: props.whileHover ?? { scale: 1.02 },
          whileTap: props.whileTap ?? { scale: 0.98 },
          animate: continuous ? { scale: [1, 1.04, 1, 1.06, 1] } : props.animate,
          transition: continuous
            ? { duration: 2.1, repeat: Infinity, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.7, 1] }
            : props.transition,
        }

    return <motion.button ref={ref} className={baseClassName} {...motionProps} {...props} />
  },
)

MotionButton.displayName = 'MotionButton'

export { MotionButton }
