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
}
