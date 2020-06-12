import React, { ReactNode } from 'react'
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

const Buttons: React.FunctionComponent = ({ children }) => (
  <div className="modal__buttons">
    { children }
  </div>
)

const Modal = ({ title, children, stateFn, show, confirm }: Props) => {
  const setShowModal = stateFn
    ? () => stateFn(false)
    : undefined

  return <BulmaModal
    show={show}
    onClose={setShowModal}
    showClose={false}
    closeOnEsc={!confirm}
    closeOnBlur={!confirm}
  >
    <BulmaModal.Content>
      <Box>
        {!confirm && <button
          type="button"
          onClick={setShowModal}
          className="modal-close is-large"
          aria-label="close"
        />}
        <Heading className="modal__heading oneandhalf-bs" size="small" >{title}</Heading>
        {children}
      </Box>
    </BulmaModal.Content>
  </BulmaModal>
}

Modal.Buttons = Buttons

export default Modal
