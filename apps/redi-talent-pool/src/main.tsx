import formbricks from '@formbricks/js/website'
import { initSentry } from '@talent-connect/shared-utils'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import i18n (needs to be bundled ;))
import './main.scss'
import './services/i18n/i18n'

// We used to call initSentry('con') here. Now we can only init Sentry
// if user accepts it in the cookie banner. So we expose the function
// here to window so that cookie banner can call as needed.
// prettier-ignore
(window as any).initSentry = initSentry

const environmentId =
  process.env.NODE_ENV === 'production'
    ? 'clxii0o4r01bt7f3o9zm71or8'
    : 'clxii0o4r01bt7f3o9zm71or8'

if (typeof window !== 'undefined') {
  formbricks.init({
    environmentId: environmentId,
    apiHost: 'https://app.formbricks.com',
  })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

console.log(
  'This ReDI Talet Pool build is configured for environment: ',
  process.env.NODE_ENV
)
