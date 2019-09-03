import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Needed for datepicker in <LogMentoringSessionDialog>
import 'date-fns'

// uncomment this to see wasted/unnecessary renders of your components
// if (process.env.NODE_ENV !== 'production') {
  // const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // whyDidYouRender(React, {include: [/.*/]});
// }

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));