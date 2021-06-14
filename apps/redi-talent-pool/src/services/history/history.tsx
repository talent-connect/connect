import { createBrowserHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

const history = createBrowserHistory()

export const HistoryContext = React.createContext(history)

export { history, Router }
