import { CSSProperties } from 'react'

export interface ButtonProps {
  children: any
  className?: string
  size?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  disabled?: boolean
  separator?: boolean
  onClick?: () => void
  simple?: boolean
  to?: string
  style?: CSSProperties
}