import React, { useState } from 'react'
import { Heading } from 'react-bulma-components'
import classnames from 'classnames'
import './Editable.scss'

interface Props {
  title: string
  onSave: Function
  read: React.ReactNode
  children: React.ReactNode
  className?: string
  savePossible?: boolean
}

function Editable (props: Props) {
  const {
    title,
    children,
    read,
    onSave,
    savePossible,
    className
  } = props

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className={classnames('editable', { [`${className}`]: className })}>
      <div className="editable__header">
        <Heading
          size={5}
          weight="normal"
          renderAs="h3"
          subtitle
          textTransform="uppercase"
        >
          {title}
        </Heading>
        <div className="editable__header__buttons">
          { isEditing ? (<>
            <button
              onClick={() => {
                onSave()
                setIsEditing(false)
              }}
              disabled={savePossible}
              type="submit"
            >
            Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
              }}
              type="submit"
            >
            Cancel
            </button>
          </>) : (
            <button
              onClick={() => {
                setIsEditing(true)
              }}
              type="submit"
            >
              Edit
            </button>
          )}</div>
      </div>
      <div className="editable__body">
        { isEditing ? children : read }
      </div>
    </div>
  )
}

export default Editable
