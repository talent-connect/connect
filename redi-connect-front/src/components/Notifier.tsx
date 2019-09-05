import React, { useState, useEffect, useCallback, SetStateAction } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

let openSnackbarFn: ({message, action}: {message: string, action?: any}) => void
let closeSnackbarFn: () => void

export const Notifier = React.memo(function Notifier (props) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [action, setAction] = useState(null)

  const _closeSnackbar = () => {
    setOpen(false)
  }

  const _openSnackbar = ({ message, action }: {message: string, action?: any}) => {
    setOpen(true)
    setMessage(message)
    setAction(action)
  }

  useEffect(() => {
    openSnackbarFn = _openSnackbar
    closeSnackbarFn = _closeSnackbar
  }, [])

  const handleSnackbarClose = () => {
    setOpen(false)
    setMessage('')
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      message={<span
        id='snackbar-message-id'
        dangerouslySetInnerHTML={{ __html: message }}
      />}
      action={action}
      autoHideDuration={20000}
      onClose={useCallback(handleSnackbarClose, [])}
      open={open}
      ContentProps={{
        'aria-describedby': 'snackbar-message-id'
      }}
    />
  )
})

export function openSnackbar ({ message, action }: {message:string, action?: any}) {
  openSnackbarFn({ message, action })
}

export function closeSnackbar () {
  closeSnackbarFn()
}