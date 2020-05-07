import React, { useState } from 'react'
import { Element } from 'react-bulma-components'
import './Editable.scss'

interface Props {
  title: string
  onSave: Function
  read: React.ReactNode
  children: React.ReactNode
}

function Editable (props: Props) {
  const {
    title,
    children,
    read,
    onSave
  } = props

  const [editable, setEditable] = useState(false)

  return (
    <div className="editable">
      <div className="editable__header">
        <Element
          size={4}
          weight="normal"
          renderAs="h2"
          subtitle
          textTransform="uppercase"
        >
          {title}
        </Element>
        <div className="editable__header__buttons">
          { editable ? (<>
            <button
              onClick={() => {
                onSave()
                setEditable(false)
              }}
              type="submit"
            >
            Save
            </button>
            <button
              onClick={() => {
                setEditable(false)
              }}
              type="submit"
            >
            Cancel
            </button>
          </>) : (
            <button
              onClick={() => {
                setEditable(true)
              }}
              type="submit"
            >
              Edit
            </button>
          )}</div>
      </div>
      <div className="editable__body">
        { editable ? children : read }
      </div>
    </div>
  )
}

export default Editable
