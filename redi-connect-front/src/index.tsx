import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker'
import App from './App';
// Needed for datepicker in <LogMentoringSessionDialog>
import 'date-fns'

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    include: [/.*/]
  });
}

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));


serviceWorker.register()
