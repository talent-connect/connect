import './TpMainNavItem.scss'
import classnames from 'clsx'

interface Props {
  page: 'profile-page' | 'browse-page' | 'cv-builder-page'
  isActive?: boolean
}

export function TpMainNavItem({ page, isActive }: Props) {
  return (
    <div className="tp-main-nav-item">
      <div></div>
      <div className={`tp-main-nav-item__icon tp-main-nav-item__${page}`}></div>
      <div
        className={classnames({ 'tp-main-nav-item__active-bar': isActive })}
      ></div>
    </div>
  )
}
