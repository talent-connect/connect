import classnames from 'clsx'
import React from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import './TpMainNavItem.scss'

interface Props {
  page: 'profile-page' | 'browse-page' | 'cv-builder-page'
  to: string
  isActive?: boolean
  isDisabled?: boolean
}

interface FancyLinkProps {
  onClick: (event: React.MouseEvent) => void
  isDisabled?: boolean
  children?: React.ReactNode
}

const FancyLink = React.forwardRef<HTMLAnchorElement>(
  (props: FancyLinkProps, ref) => (
    <a
      ref={ref}
      {...props}
      className="tp-main-nav-item"
      style={{ cursor: props.isDisabled ? 'not-allowed' : 'pointer' }}
    >
      {props.children}
    </a>
  )
)

export function TpMainNavItem({ page, to, isActive, isDisabled }: Props) {
  const onClick = useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) {
        event.preventDefault()
      }
    },
    [isDisabled]
  )

  return (
    <Link
      to={to}
      component={FancyLink}
      onClick={onClick}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
    >
      <div></div>
      <div
        className={classnames(
          'tp-main-nav-item__icon',
          `tp-main-nav-item__${page}`,
          { disabled: isDisabled }
        )}
      ></div>
      <div
        className={classnames({ 'tp-main-nav-item__active-bar': isActive })}
      ></div>
    </Link>
  )
}
