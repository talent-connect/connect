import './EmptySectionPlaceholder.scss'

interface Props {
  height: 'extra-slim' | 'slim' | 'tall'
  text: string
  onClick: () => void
  style?: React.CSSProperties
}

export function EmptySectionPlaceholder({
  height,
  text,
  onClick,
  style = {},
}: Props) {
  return (
    <div
      className={`empty-section-placeholder empty-section-placeholder--${height}`}
      onClick={onClick}
      style={style}
    >
      {text}
    </div>
  )
}
