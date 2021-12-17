import { Subject } from 'rxjs'

export interface FormDraggableAccordionProps {
  title: string
  children: React.ReactNode
  initialOpen?: boolean
  onRemove?: () => void
  closeAccordionSignalSubject?: Subject<void>
}
