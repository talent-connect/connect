import { useState, useEffect, FC } from 'react'
import {
  Snackbar,
  Slide,
  SnackbarContent,
  makeStyles,
  Theme,
  IconButton,
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green } from '@material-ui/core/colors'
import { Subject } from 'rxjs'
import { Optional } from 'utility-types'
import clsx from 'clsx'

const subjectShowNotification = new Subject<SubjectShowNotification>()
const subjectHideNotification = new Subject()

// Variant types w/ icon + backgroundclor obtained from: https://material-ui.com/components/snackbars/
type NotificationVariant = 'success' | 'error' | 'info' | 'warning'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const useNotificationStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export interface AppNotificationOptions {
  variant: NotificationVariant
  autoHideDuration: number | null
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
    variant: 'info',
    ...options,
  }
  subjectShowNotification.next({ ...finalOptions, message })
}

export const hideNotification = () => subjectHideNotification.next()

export const AppNotification() {
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

  const styleClasses = useNotificationStyles()

  const Icon = variantIcon[state?.variant] || null

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
        className={state ? styleClasses[state.variant] : ''}
        message={
          <span className={styleClasses.message}>
            {Icon && (
              <Icon
                className={clsx(styleClasses.icon, styleClasses.iconVariant)}
              />
            )}
            {state?.message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={hide}
          >
            <CloseIcon className={styleClasses.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}

export default AppNotification
