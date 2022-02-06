import { useState } from 'react'
import { Caption, Icon } from '../../atoms'
import classnames from 'classnames'
import './Editable.scss'
import { EditableProps } from './Editable.props';

function Editable ({
  title,
  children,
  read,
  onSave,
  onClose,
  savePossible,
  className,
}: EditableProps) {

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onSave()
    setIsEditing(false)
  }

  const handleClose = () => {
    onClose()
    setIsEditing(false)
  }

  return (
    <div className={classnames('editable', { [`${className}`]: className })}>
      <div className="editable__header">
        <Caption>{title}</Caption>
        <div className="editable__header__buttons">
          {isEditing ? (
            <>
              <div
                onClick={savePossible && handleSave}
                className={classnames('icon__button', {
                  'icon__button--disabled': !savePossible,
                })}
              >
                <Icon icon="check" />
              </div>

              <div className="icon__button" onClick={handleClose}>
                <Icon icon="cancel" />
              </div>
            </>
          ) : (
            <div
              className="icon__button"
              onClick={() => { setIsEditing(true) }}
            >
              <Icon icon="edit" />
            </div>
          )}
        </div>
      </div>
      <div className="editable__body">{isEditing ? children : read}</div>
    </div>
  )
}

export default Editable
