import { Tooltip } from '@material-ui/core'
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
  tooltip?: string
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

function wrapInTooltip(component: React.ReactElement, tooltip: string) {
  return <Tooltip title={tooltip}>{component}</Tooltip>
}

export function TpMainNavItem({
  page,
  to,
  isActive,
  isDisabled,
  tooltip,
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
        <FancyLink isDisabled={isDisabled} tooltip={tooltip} {...props} />
      )}
      onClick={onClick}
    >
      <div></div>
      <TpMainNavItemIcon
        page={page}
        isDisabled={isDisabled}
        tooltip={tooltip}
      />
      <div
        className={classnames({ 'tp-main-nav-item__active-bar': isActive })}
      ></div>
    </Link>
  )
}

function TpMainNavItemIcon({
  page,
  isDisabled,
  tooltip,
}: {
  page: string
  isDisabled?: boolean
  tooltip?: string
}) {
  let iconElement = (
    <div
      className={classnames(
        'tp-main-nav-item__icon',
        `tp-main-nav-item__${page}`,
        { disabled: isDisabled }
      )}
    ></div>
  )
  if (tooltip) iconElement = wrapInTooltip(iconElement, tooltip)

  return iconElement
}
