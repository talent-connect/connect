import { Caption, Icon } from '@talent-connect/shared-atomic-design-components'
import classnames from 'clsx'
import React, { useEffect, useState } from 'react'
import { Columns, Element } from 'react-bulma-components'
import { Subject } from 'rxjs'
import './AccordionForm.scss'

interface Props {
  title: string
  isSaveDisabled?: boolean
  closeAccordionSignalSubject?: Subject<void>
  children: React.ReactNode
}

export function AccordionForm({
  title,
  closeAccordionSignalSubject,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const sub = closeAccordionSignalSubject?.subscribe(() => setIsOpen(false))

    return () => sub?.unsubscribe()
  }, [closeAccordionSignalSubject])

  return (
    <div className="accordion-form">
      <Columns
        breakpoint="mobile"
        className="accordion-form__title"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Columns.Column>
          <Caption>
            <strong>{title}</strong>
          </Caption>
        </Columns.Column>
        <Columns.Column narrow>
          <Icon
            icon="chevron"
            size="small"
            className={classnames({ 'icon--rotate': isOpen })}
          />
        </Columns.Column>
      </Columns>
      <Element
        className={classnames('accordion-form__answer', {
          'accordion-form__answer--show': isOpen,
        })}
      >
        {isOpen ? children : null}
      </Element>
    </div>
  )
}
