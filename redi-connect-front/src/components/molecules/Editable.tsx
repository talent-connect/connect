import React, { useState } from 'react'
import { Heading, Content } from 'react-bulma-components'
import { ReactComponent as Save } from '../../assets/images/save.svg'
import { ReactComponent as Edit } from '../../assets/images/edit.svg'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import classnames from 'classnames'
import './Editable.scss'

interface Props {
  title: string
  onSave: Function
  read: React.ReactNode
  children: React.ReactNode
  className?: string
  placeholder?: string
  savePossible?: boolean
}

function Editable (props: Props) {
  const {
    title,
    children,
    read,
    onSave,
    savePossible,
    placeholder,
    className
  } = props

  const [isEditing, setIsEditing] = useState(false)
  const readOnly = read || (<Content italic>{placeholder}</Content>)

  const handleSave = () => {
    onSave()
    setIsEditing(false)
  }

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
            <Save
              onClick={savePossible ? handleSave : undefined}
              className={classnames('icon__button', { 'icon__button--disabled': !savePossible })}
            />
            <Close className='icon__button' onClick={() => {
              setIsEditing(false)
            }}/>
          </>) : (
            <Edit className='icon__button' onClick={() => {
              setIsEditing(true)
            }}/>
          )}</div>
      </div>
      <div className="editable__body">
        { isEditing ? children : readOnly }
      </div>
    </div>
  )
}

export default Editable
