import './EmptySectionPlaceholder.scss'
import classnames from 'clsx'
import { FC, CSSProperties, ReactNode } from 'react';

interface Props {
  height: 'extra-slim' | 'slim' | 'tall' | 'none'
  onClick: () => void
  style?: CSSProperties
  children: ReactNode
}

export const EmptySectionPlaceholder: FC<Props> = ({
  height,
  onClick,
  style = {},
  children,
}) => (
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
