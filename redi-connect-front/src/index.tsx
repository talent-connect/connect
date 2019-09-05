import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Needed for datepicker in <LogMentoringSessionDialog>
import 'date-fns'
import { openSnackbar, closeSnackbar } from './components/Notifier'
import Button from '@material-ui/core/Button'
import * as serviceWorker from './serviceWorker'

serviceWorker.register({
  onUpdate: (registration: ServiceWorkerRegistration) => {
    const onButtonClick = (registration: ServiceWorkerRegistration) => (e: React.MouseEvent) => {
      if (registration.waiting) {
        // When the user asks to refresh the UI, we'll need to reload the window
        let isRefreshing: boolean
        navigator.serviceWorker.addEventListener('controllerchange', function (event) {
          // Ensure refresh is only called once.
          // This works around a bug in "force update on reload".
          if (isRefreshing) {
            return
          }

          isRefreshing = true
          console.log('Controller loaded')
          window.location.reload()
        })

        // Send a message to the new serviceWorker to activate itself
        registration.waiting.postMessage('skipWaiting')
      }
    }
    openSnackbar({
      message: 'A new version of this app is available.',
      action: <Button color='secondary' size='small' onClick={onButtonClick(registration)}> Load new version </Button>
    })
  },
  onSuccess: (registration: ServiceWorkerRegistration) => {
    openSnackbar({ message: 'This application works offline! Content has been cached for offline usage.' })
  },
  onOffline: () => {
    openSnackbar({ message: 'No internet connection available.. The application is running in offline mode!' })
  },
  onOnline: () => {
    closeSnackbar()
  }
})

// uncomment this to see wasted/unnecessary renders of your components
// if (process.env.NODE_ENV !== 'production') {
  // const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // whyDidYouRender(React, {include: [/.*/]});
// }

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));