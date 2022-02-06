import { ReactNode } from 'react';

export interface ModuleProps {
  title: string
  buttons?: ReactNode
  className?: string
  children: ReactNode
}