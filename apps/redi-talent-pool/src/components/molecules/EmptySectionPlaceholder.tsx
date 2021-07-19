import './EmptySectionPlaceholder.scss'
import classnames from 'clsx'

interface Props {
  height: 'extra-slim' | 'slim' | 'tall' | 'none'
  onClick: () => void
  style?: React.CSSProperties
  children: React.ReactNode
}

export function EmptySectionPlaceholder({
  height,
  onClick,
  style = {},
  children,
}: Props) {
  return (
    <div
      className={classnames('empty-section-placeholder', {
        [`empty-section-placeholder--${height}`]: height !== 'none',
      })}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}
