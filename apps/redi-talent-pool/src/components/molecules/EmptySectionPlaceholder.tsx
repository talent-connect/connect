import './EmptySectionPlaceholder.scss'

interface Props {
  height: 'slim' | 'tall'
  text: string
}

export function EmptySectionPlaceholder({ height, text }: Props) {
  return (
    <div
      className={`empty-section-placeholder empty-section-placeholder--${height}`}
    >
      {text}
    </div>
  )
}
