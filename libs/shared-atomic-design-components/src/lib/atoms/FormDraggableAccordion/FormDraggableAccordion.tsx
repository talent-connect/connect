import classnames from 'clsx'
import { useEffect, useState, FC } from 'react'
import { Columns, Element } from 'react-bulma-components'
import { Icon } from '../Icon'
import { FormDraggableAccordionProps } from './FormDraggableAccordion.props';
import './FormDraggableAccordion.scss'

import { ReactComponent as AccordionHandleIcon } from '../../../assets/images/accordion-handle.svg'

const FormDraggableAccordion: FC<FormDraggableAccordionProps> = ({
  title,
  children,
  onRemove = null,
  initialOpen = false,
  closeAccordionSignalSubject = null,
}) => {
  const [showAnswer, setShowAnswer] = useState(initialOpen)

  useEffect(() => {
    const sub = closeAccordionSignalSubject?.subscribe(() =>
      setShowAnswer(false)
    )
    return () => sub?.unsubscribe()
  }, [closeAccordionSignalSubject])

  return (
    <div className="form-draggable-accordion">
      <Columns
        breakpoint="mobile"
        className="form-draggable-accordion__title"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <Columns.Column>
          <Element style={{ display: 'flex' }}>
            <AccordionHandleIcon style={{ marginRight: '.8rem' }} /> {title}
          </Element>
        </Columns.Column>
        <Columns.Column narrow>
          <Icon
            icon="chevron"
            size="small"
            className={classnames({ 'icon--rotate': showAnswer })}
          />
        </Columns.Column>
        <Columns.Column narrow>
          {onRemove ? (
            <Icon icon="cancel" size="small" onClick={onRemove} />
          ) : null}
        </Columns.Column>
      </Columns>
      <Element
        className={classnames('form-draggable-accordion__answer', {
          'form-draggable-accordion__answer--show': showAnswer,
        })}
      >
        {children}
      </Element>
    </div>
  )
}

export default FormDraggableAccordion
