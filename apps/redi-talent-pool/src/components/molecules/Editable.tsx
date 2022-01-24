import {
  Heading,
  Icon,
  Modal,
} from '@talent-connect/shared-atomic-design-components'
import { CSSProperties, FC, ReactNode } from 'react'
import { Element } from 'react-bulma-components'
import './Editable.scss'

interface Props {
  isEditing: boolean
  setIsEditing: (boolean: boolean) => void
  disableEditing?: boolean
  isFormDirty?: boolean
  title?: string
  readComponent: ReactNode
  modalTitle: string
  modalHeadline: string
  modalBody: ReactNode
  modalStyles?: CSSProperties
}

export const Editable: FC<Props> = ({
  isEditing,
  setIsEditing,
  disableEditing,
  isFormDirty,
  title,
  readComponent,
  modalTitle,
  modalHeadline,
  modalBody,
  modalStyles,
}) => {
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
          {!disableEditing ? (
            <div className="icon__button" onClick={() => setIsEditing(true)}>
              <Icon icon="edit" />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="is-flex is-flex-direction-row">
          <span style={{ flexGrow: 1 }}>&nbsp;</span>
          {!disableEditing ? (
            <div
              className="icon__button"
              onClick={() => setIsEditing(true)}
              style={{ position: 'relative', top: '50px' }}
            >
              <Icon icon="edit" />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}

      <div className="profile-section--body">{readComponent}</div>
      <Modal
        title=""
        show={isEditing}
        stateFn={setIsEditing}
        confirm={isFormDirty}
      >
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
