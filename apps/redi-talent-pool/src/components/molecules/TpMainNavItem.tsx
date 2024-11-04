import classnames from 'clsx'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import './TpMainNavItem.scss'

interface Props {
  page: 'profile-page' | 'browse-page' | 'cv-builder-page'
  to: string
  isActive?: boolean
  isDisabled?: boolean
  pageName: string
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

export function TpMainNavItem({
  page,
  to,
  isActive,
  isDisabled,
  pageName,
}: Props) {
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
      component={(props) => (
        <FancyLink isDisabled={isDisabled} pageName={pageName} {...props} />
      )}
      onClick={onClick}
    >
      {isActive && (
        <>
          <div className="tp-main-nav-item__active-bar"></div>
          <div className="tp-main-nav-item__active-bar--horizontal"></div>
        </>
      )}
      <TpMainNavItemIcon
        page={page}
        isDisabled={isDisabled}
        pageName={pageName}
      />
    </Link>
  )
}

function TpMainNavItemIcon({
  page,
  isDisabled,
  pageName,
}: {
  page: string
  isDisabled?: boolean
  pageName?: string
}) {
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
