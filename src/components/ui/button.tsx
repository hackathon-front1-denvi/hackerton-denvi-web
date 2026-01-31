import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/shared/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // 기존 커스텀 variant
        black: 'bg-black text-white hover:bg-black/90 disabled:bg-[#dddddd]',
        white: 'bg-white border border-black text-black hover:bg-gray-50 disabled:bg-white disabled:border-[#dddddd]',
        gray00:
          'bg-[#f9f9f9] border border-[#dddddd] text-black hover:bg-gray-100 disabled:bg-[#f9f9f9] disabled:border-[#F4F4F4]',
        gray01: 'bg-[#F4F4F4] text-black hover:bg-gray-200 disabled:bg-[#F4F4F4]',
        pink: 'bg-[#E60C63] text-white hover:bg-[#E60C63]/90',
        choco: 'bg-[#3D1D1D] text-white hover:bg-[#3D1D1D]/90',
        purple: 'bg-[#6522D1] text-white hover:bg-[#6522D1]/90',
        carrot: 'bg-gradient-to-br from-[#FF8C42] to-[#FFB366] text-white hover:opacity-90 disabled:opacity-50',
        'black-outline': 'border border-black text-black hover:bg-black hover:text-white',
        'white-outline': 'border border-black text-black hover:bg-gray-50',
        'gray00-outline': 'border border-[#f9f9f9] text-black hover:bg-gray-50',
        'gray01-outline': 'border border-[#F4F4F4] text-black hover:bg-gray-100',
        'pink-outline': 'border border-[#E60C63] text-[#E60C63] hover:bg-[#E60C63] hover:text-white',
        'choco-outline': 'border border-[#3D1D1D] text-[#3D1D1D] hover:bg-[#3D1D1D] hover:text-white',
        'purple-outline': 'border border-[#6522D1] text-[#6522D1] hover:bg-[#6522D1] hover:text-white',
        'carrot-outline':
          'border border-[#FFB366] text-[#FF8C42] hover:bg-gradient-to-br hover:from-[#FF8C42] hover:to-[#FFB366] hover:text-white',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        // 기존 커스텀 size
        xs: 'text-text_13_20 px-3 py-1',
        md: 'text-text_14_20 px-4 py-3.25',
        xl: 'text-text_18_24 px-5.5 py-3.75 font-bold',
      },
      rounded: {
        false: '',
        true: 'rounded-[32px]',
      },
      bottomSafe: {
        false: '',
        true: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: false,
      bottomSafe: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, bottomSafe, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    // bottomSafe에 따른 추가 클래스 처리
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

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, bottomSafe, className }), safeAreaClasses)}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
