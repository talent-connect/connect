import './TpMainNavItem.scss'
import classnames from 'clsx'
import { useCallback } from 'react'

interface Props {
  page: 'profile-page' | 'browse-page' | 'cv-builder-page'
  href: string
  isActive?: boolean
  isDisabled?: boolean
}

export function TpMainNavItem({ page, href, isActive, isDisabled }: Props) {
  const onClick = useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) {
        event.preventDefault()
      }
    },
    [isDisabled]
  )

  return (
    <a
      className="tp-main-nav-item"
      href={href}
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
    </a>
  )
}
