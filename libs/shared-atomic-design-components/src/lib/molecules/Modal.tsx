import React, { ReactNode, useEffect } from 'react'
import { Heading } from '../atoms'
import { Box, Modal as BulmaModal } from 'react-bulma-components'
import './Modal.scss'

interface Props {
  title: string
  show: boolean
  confirm?: boolean
  children: ReactNode
  stateFn?: (state: boolean) => void
}

const Modal = ({ title, children, stateFn, show, confirm }: Props) => {
  const setShowModal = stateFn ? () => stateFn(false) : undefined

  useEffect(() => {
    document.body.classList.toggle('modal-open', show)
  }, [show])

  return (
    <BulmaModal
      show={show}
      onClose={setShowModal}
      showClose={false}
      closeOnEsc={!confirm}
      closeOnBlur={!confirm}
    >
      <BulmaModal.Card>
        <BulmaModal.Card.Head showClose={false} className="modal__heading">
          {!confirm && (
            <button
              type="button"
              onClick={setShowModal}
              className="modal-close is-large"
              aria-label="close"
            />
          )}
          <Heading size="small">{title}</Heading>
        </BulmaModal.Card.Head>
        {children}
      </BulmaModal.Card>
    </BulmaModal>
  )
}

Modal.Body = BulmaModal.Card.Body
Modal.Foot = BulmaModal.Card.Foot

export default Modal
