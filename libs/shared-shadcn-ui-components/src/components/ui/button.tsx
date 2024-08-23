import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@talent-connect/shared-utils'

const buttonVariants = cva(
  'tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-pointer-events-none disabled:tw-opacity-50',
  {
    variants: {
      variant: {
        default:
          'tw-bg-primary tw-text-primary-foreground tw-shadow hover:tw-bg-primary/90',
        destructive:
          'tw-bg-destructive tw-text-destructive-foreground tw-shadow-sm hover:tw-bg-destructive/90',
        outline:
          'tw-border tw-border-input tw-bg-background tw-shadow-sm hover:tw-bg-accent hover:tw-text-accent-foreground',
        secondary:
          'tw-bg-secondary tw-text-secondary-foreground tw-shadow-sm hover:tw-bg-secondary/80',
        ghost: 'hover:tw-bg-accent hover:tw-text-accent-foreground',
        link: 'tw-text-[#FF7d55] tw-underline-offset-4 hover:tw-text-[#FD4D00]',
        rounded:
          'tw-text-[#FF7d55] hover:text-[#FD4D00] bg-[#FFEAE2] rounded-full',
      },
      size: {
        default: 'tw-h-9 tw-px-4 tw-py-2',
        sm: 'tw-h-8 tw-rounded-md tw-px-3 tw-text-xs',
        lg: 'tw-h-10 tw-rounded-md tw-px-8',
        icon: 'tw-h-9 tw-w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
