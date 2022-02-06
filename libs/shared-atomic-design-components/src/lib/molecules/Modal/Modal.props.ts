import { CSSProperties, ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode
  title?: string
  show: boolean
  confirm?: boolean
  stateFn?: (state: boolean) => void
  styles?: CSSProperties
}