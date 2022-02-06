import { ReactNode } from 'react';
import { Subject } from 'rxjs'

export interface FormDraggableAccordionProps {
  /** */
  title: string
  /** */
  initialOpen?: boolean
  /** */
  onRemove?: () => void
  /** */
  closeAccordionSignalSubject?: Subject<void>
  children: ReactNode
}
