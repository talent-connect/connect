import { initSentry } from '@talent-connect/shared-utils'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import i18n (needs to be bundled ;))
import './main.scss'
import './services/i18n/i18n'
// Needed for datepicker in <LogMentoringSessionDialog>

// uncomment this to see wasted/unnecessary renders of your components
// if (process.env.NODE_ENV !== 'production') {
// const whyDidYouRender = require('@welldone-software/why-did-you-render');
// whyDidYouRender(React, {include: [/.*/]});
// }

initSentry('tp')

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
