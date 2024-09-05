import { Icon } from '@talent-connect/shared-atomic-design-components'
import * as React from 'react'

import {
  ButtonProps,
  buttonVariants,
} from '@talent-connect/shared-shadcn-ui-components'
import { classNames } from '@talent-connect/shared-utils'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={classNames(
      'tw-mx-auto tw-flex tw-w-full tw-justify-center',
      className
    )}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={classNames(
      'tw-flex tw-flex-row tw-items-center tw-gap-1',
      className
    )}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={classNames('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={classNames(
      buttonVariants({
        variant: isActive ? 'rounded' : 'link',
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="icon"
    className={classNames(
      'tw-flex tw-items-center tw-justify-center tw-rounded-[3px] tw-border tw-border-[#FF7D55] hover:tw-border-[2px] hover:tw-border-[#FD4D00] tw-transition-colors',
      disabled
        ? '!tw-border-[#DADADA] tw-pointer-events-none tw-opacity-50'
        : '',
      className
    )}
    {...props}
  >
    <Icon
      icon="chevronLeft"
      size="small"
      className={disabled ? 'icon--disabled' : ''}
    />
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="icon"
    className={classNames(
      'tw-flex tw-items-center tw-justify-center tw-rounded-[3px] tw-border tw-border-[#FF7D55] hover:tw-border-[2px] hover:tw-border-[#FD4D00] tw-transition-colors',
      disabled
        ? '!tw-border-[#DADADA] tw-pointer-events-none tw-opacity-50'
        : '',
      className
    )}
    {...props}
  >
    <Icon
      icon="chevronRight"
      size="small"
      className={disabled ? 'icon--disabled' : ''}
    />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={classNames(
      'tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center',
      className
    )}
    {...props}
  >
    <Icon icon="ellipsisHorizontal" size="large" />
    <span className="tw-sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
