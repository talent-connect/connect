import React, { ReactNode, useEffect, useState } from 'react'
import { Heading } from '../atoms'
import { Box, Modal as BulmaModal } from 'react-bulma-components'
import './Modal.scss'

interface Props {
  title?: string
  show: boolean
  confirm?: boolean
  children: ReactNode
  stateFn?: (state: boolean) => void
  styles?: React.CSSProperties
}

const Modal = ({ title, children, stateFn, show, confirm, styles }: Props) => {
  const setShowModal = stateFn ? () => stateFn(false) : undefined

  const [internalShow, setInternalShow] = useState(false)

  useEffect(() => {
    if (show) {
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.position = 'fixed'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
    setInternalShow(show)

    // document.body.classList.toggle('modal-open', show)
  }, [show])

  return (
    <BulmaModal
      show={internalShow}
      onClose={setShowModal}
      showClose={false}
      closeOnEsc={!confirm}
      closeOnBlur={!confirm}
    >
      <BulmaModal.Card style={styles}>
        {title ? (
          <BulmaModal.Card.Head showClose={false} className="modal__heading">
            {!confirm && <CloseButton onClick={setShowModal} />}
            <Heading size="small">{title}</Heading>
          </BulmaModal.Card.Head>
        ) : (
          !confirm && <CloseButton onClick={setShowModal} />
        )}
        {children}
      </BulmaModal.Card>
    </BulmaModal>
  )
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className="modal-close is-large"
      aria-label="close"
    />
  )
}

Modal.Body = BulmaModal.Card.Body
Modal.Foot = BulmaModal.Card.Foot

export default Modal
