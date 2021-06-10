import './EmptySectionPlaceholder.scss'

interface Props {
  height: 'slim' | 'tall'
  text: string
  onClick: () => void
}

export function EmptySectionPlaceholder({ height, text, onClick }: Props) {
  return (
    <div
      className={`empty-section-placeholder empty-section-placeholder--${height}`}
      onClick={onClick}
    >
      {text}
    </div>
  )
}
