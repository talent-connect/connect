import { CSSProperties, MouseEventHandler, ReactNode } from 'react'

export interface ButtonProps {
  className?: string
  children: ReactNode
  size?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  disabled?: boolean
  separator?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  simple?: boolean
  to?: string
  style?: CSSProperties
}