import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'
// import i18n (needs to be bundled ;))
import './services/i18n/i18n'
// Needed for datepicker in <LogMentoringSessionDialog>

// uncomment this to see wasted/unnecessary renders of your components
// if (process.env.NODE_ENV !== 'production') {
// const whyDidYouRender = require('@welldone-software/why-did-you-render');
// whyDidYouRender(React, {include: [/.*/]});
// }

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)
