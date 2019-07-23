import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Needed for datepicker in <LogMentoringSessionDialog>
import 'date-fns'
import './services/sentry-error'

ReactDOM.render(<App />, document.getElementById('root'));
