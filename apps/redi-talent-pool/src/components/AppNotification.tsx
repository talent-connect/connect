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
  // console.log('show', message)
  const finalOptions: AppNotificationOptions = {
    autoHideDuration: 5000,
    ...options,
  }
  subjectShowNotification.next({ ...finalOptions, message })
}

export function AppNotification() {
  const [state, setState] = useState<AppNotificationState>(null)

  const show = useCallback((options: SubjectShowNotification) => {
    console.log('yo')
    setState({ ...options })
  }, [])

  console.log('state', state)

  useEffect(() => {
    const subscriptionShow = subjectShowNotification.subscribe(show)

    return () => {
      subscriptionShow.unsubscribe()
    }
  }, [])

  return (
    <div>
      <Snackbar
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
    </div>
  )
}

export default AppNotification
