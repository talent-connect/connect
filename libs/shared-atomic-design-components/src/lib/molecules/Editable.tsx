import { SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material'
import { Button } from '@talent-connect/shared-atomic-design-components'
import classnames from 'classnames'
import React, { useState } from 'react'
import { Caption, Icon } from '../atoms'
import './Editable.scss'

interface Props {
  title: string
  onSave: () => void
  onClose: () => void
  read: React.ReactNode
  children: React.ReactNode
  className?: string
  placeholder?: string
  savePossible?: boolean
}

function Editable(props: Props) {
  const { title, children, read, onSave, onClose, savePossible, className } =
    props

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onSave()
    setIsEditing(false)
  }

  const handleClose = () => {
    onClose()
    setIsEditing(false)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={classnames('editable', { [`${className}`]: className })}>
      <div className="editable__header">
        <Caption>{title}</Caption>
        <div className="editable__header__buttons">
          {isEditing && !isMobile ? (
            <>
              <Button
                onClick={savePossible ? handleSave : undefined}
                disabled={!savePossible}
                className="save__button"
                simple
              >
                Save
              </Button>

              <div className="icon__button" onClick={handleClose}>
                <Icon icon="cancel" />
              </div>
            </>
          ) : (
            <div
              className="icon__button"
              onClick={() => {
                setIsEditing(true)
              }}
            >
              <Icon icon="edit" />
            </div>
          )}
        </div>
      </div>
      <div className="editable__body">{isEditing && !isMobile? children : read}</div>

    {isMobile? (

      <SwipeableDrawer
      anchor="bottom"
      open={isEditing}
      onClose={() => setIsEditing(false)}
      onOpen={() => console.log('open')}
      >
      <div className="drawer__header">
        <Caption>
          { title.includes("optional")? (
            <>
            {title.split("(optional)")}
            <div className='drawer__subheader'>(optional)</div>
            </>
          ) : (
            title
          )}
        </Caption>
    
        <div className="icon__button" onClick={handleClose}>
        <Icon size='small' icon="cancel" />
        </div>
      </div>
      <div className="drawer__body">{children}</div>
      <div className="drawer__footer">
      <Button 
        onClick={savePossible ? handleSave : undefined}
        disabled={!savePossible}
      >
        Save
      </Button>
      </div>
    </SwipeableDrawer>
    ) : null}
        </div>

  )
}

export default Editable
