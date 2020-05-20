import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Needed for datepicker in <LogMentoringSessionDialog>

// uncomment this to see wasted/unnecessary renders of your components
// if (process.env.NODE_ENV !== 'production') {
// const whyDidYouRender = require('@welldone-software/why-did-you-render');
// whyDidYouRender(React, {include: [/.*/]});
// }

const DownForMaintenance = () => (
  <div>
    <h3>ReDI Connect down a few hours for bug fixes</h3>
    <p>We've received bug reports from some of you, so we've taken this site down for a few hours while we fix the issues.</p>
    <p>This won't take too much time, so please check in again tomorrow. We'll get the site up and running as soon as we've fixed the issue.</p>
  </div>);

if (process.env.REACT_APP_REDI_LOCATION === 'munich' && process.env.NODE_ENV !== "development") {
  ReactDOM.render(<DownForMaintenance />, document.getElementById('root'));
} else {
  ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));
}

console.log("This ReDI Connect build is configured for location: ", process.env.REACT_APP_REDI_LOCATION)