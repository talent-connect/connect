import classnames from 'clsx'
import React, { FC, ReactNode, MouseEvent } from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import './TpMainNavItem.scss'

interface Props {
  page: `${'profile' | 'browse' | 'cv-builder'}-page`
  to: string
  isActive?: boolean
  isDisabled?: boolean
  pageName: string
}

interface FancyLinkProps {
  onClick: (event: MouseEvent) => void
  isDisabled?: boolean
  children?: ReactNode
}

const FancyLink = React.forwardRef<HTMLAnchorElement>((props: FancyLinkProps, ref) => (
    <a
      className="tp-main-nav-item"
      style={{ cursor: props.isDisabled ? 'not-allowed' : 'pointer' }}
      ref={ref}
      {...props}
    >
      {props.children}
    </a>
  )
)

export function TpMainNavItem ({
  page,
  to,
  isActive,
  isDisabled,
  pageName,
}: Props) {
  const onClick = useCallback(
    (event: MouseEvent) => { if (isDisabled) event.preventDefault() },
    [isDisabled]
  )

  return (
    <Link
      to={to}
      onClick={onClick}
      component={(props) => (
        <FancyLink
          {...{ isDisabled, pageName }}
          {...props}
        />
      )}
    >
      <div></div>
      <TpMainNavItemIcon {...{ page, isDisabled, pageName }} />
      <div
        className={classnames({ 'tp-main-nav-item__active-bar': isActive })}
      ></div>
    </Link>
  )
}

interface TpMainNavItemIconProps {
  page: string
  isDisabled?: boolean
  pageName?: string
}

function TpMainNavItemIcon ({
  page,
  isDisabled,
  pageName,
}: TpMainNavItemIconProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        className={classnames(
          'tp-main-nav-item__icon',
          `tp-main-nav-item__${page}`,
          { disabled: isDisabled }
        )}
      ></div>
      <span style={{ fontSize: '0.875rem', color: '#5d5d5d' }}>{pageName}</span>
    </div>
  )
}
