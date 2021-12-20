import { CSSProperties } from 'react';

export interface ModalProps {
  title?: string
  show: boolean
  confirm?: boolean
  stateFn?: (state: boolean) => void
  styles?: CSSProperties
}