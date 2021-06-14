import {
  Heading,
  Icon,
  Modal,
} from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import { Element } from 'react-bulma-components'
import './Editable.scss'

interface Props {
  isEditing: boolean
  setIsEditing: (boolean) => void
  title?: string
  readComponent: React.ReactNode
  modalTitle: string
  modalHeadline: string
  modalBody: React.ReactNode
  modalStyles?: React.CSSProperties
}

export function Editable({
  isEditing,
  setIsEditing,
  title,
  readComponent,
  modalTitle,
  modalHeadline,
  modalBody,
  modalStyles,
}: Props) {
  return (
    <div className="profile-section">
      {title ? (
        <div className="profile-section--title is-flex is-flex-direction-row">
          <Element
            renderAs="h4"
            textSize={4}
            responsive={{ mobile: { textSize: { value: 7 } } }}
            className="is-flex-grow-1"
            style={{ flexGrow: 1 }}
          >
            {title}
          </Element>
          <div className="icon__button" onClick={() => setIsEditing(true)}>
            <Icon icon="edit" />
          </div>
        </div>
      ) : (
        <div className="is-flex is-flex-direction-row">
          <span style={{ flexGrow: 1 }}>&nbsp;</span>
          <div className="icon__button" onClick={() => setIsEditing(true)}>
            <Icon icon="edit" />
          </div>
        </div>
      )}

      <div className="profile-section--body">{readComponent}</div>
      <Modal title="" show={isEditing} stateFn={setIsEditing}>
        <Modal.Body>
          <Element renderAs="h4" textTransform="uppercase" textSize={6}>
            {modalTitle}
          </Element>
          <Heading size="medium" border="bottomLeft">
            {modalHeadline}
          </Heading>
          {modalBody}
        </Modal.Body>
      </Modal>
    </div>
  )
}
