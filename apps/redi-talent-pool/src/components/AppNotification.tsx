import { Slide, Snackbar, SnackbarContent } from '@mui/material'
import { useEffect, useState } from 'react'
import { Subject } from 'rxjs'
import { Optional } from 'utility-types'

const subjectShowNotification = new Subject<SubjectShowNotification>()
const subjectHideNotification = new Subject()

export interface AppNotificationOptions {
  autoHideDuration: number | undefined
}
interface SubjectShowNotification extends AppNotificationOptions {
  message: string | null
}
type AppNotificationState = SubjectShowNotification | null

export const showNotification = (
  message: string,
  options?: Optional<AppNotificationOptions>
) => {
  const finalOptions: AppNotificationOptions = {
    autoHideDuration: 5000,
    ...options,
  }
  subjectShowNotification.next({ ...finalOptions, message })
}

export const hideNotification = () => subjectHideNotification.next(null)

export function AppNotification() {
  const [state, setState] = useState<AppNotificationState>(null)

  const show = (options: SubjectShowNotification) => {
    setState({ ...options })
  }

  const hide = () => setState(null)
  useEffect(() => {
    const subscriptionShow = subjectShowNotification.subscribe(show)
    const subscriptionHide = subjectHideNotification.subscribe(hide)

    return () => {
      subscriptionShow.unsubscribe()
      subscriptionHide.unsubscribe()
    }
  }, [])

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
      open={!!state}
      autoHideDuration={state ? state.autoHideDuration : 0}
      onClose={hide}
    >
      <SnackbarContent
        message={<span>{state && state.message}</span>}
        style={{ padding: '.6em 1.3em', minWidth: 'unset' }}
      />
    </Snackbar>
  )
}

export default AppNotification
