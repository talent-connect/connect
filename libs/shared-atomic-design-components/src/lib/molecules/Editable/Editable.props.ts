import { ReactNode } from 'react';

export interface EditableProps {
  title: string
  onSave: () => void
  onClose: () => void
  read: ReactNode
  className?: string
  placeholder?: string
  savePossible?: boolean
}