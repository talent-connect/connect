import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { API_URL } from './config'

ReactDOM.render(<App />, document.getElementById('root'))

console.log('API_URL', API_URL)
