import { Slide, Snackbar, SnackbarContent } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Subject } from 'rxjs'
import { Optional } from 'utility-types'

const subjectShowNotification = new Subject<SubjectShowNotification>()

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
    autoHideDuration: 3000,
    ...options,
  }
  subjectShowNotification.next({ ...finalOptions, message })
}

export function AppNotification() {
  const [state, setState] = useState<AppNotificationState>(null)
  const [key, setKey] = useState(0)

  const show = useCallback((options: SubjectShowNotification) => {
    setKey((prevKey) => prevKey + 1)
    setState({ ...options })
  }, [])

  useEffect(() => {
    const subscriptionShow = subjectShowNotification.subscribe(show)

    return () => {
      subscriptionShow.unsubscribe()
    }
  }, [show])

  // Note: without key prop the snackbar would only appear once. Unsure exactly why it works
  // when it's present, best guess it helps uniquely identify the different snackbars.
  return (
    <Snackbar
      key={key}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
      open={!!state}
      autoHideDuration={state ? state.autoHideDuration : 0}
      onClose={() => setState(null)}
    >
      <SnackbarContent
        message={<span>{state && state.message}</span>}
        style={{ padding: '.6em 1.3em', minWidth: 'unset' }}
      />
    </Snackbar>
  )
}

export default AppNotification
