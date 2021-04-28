import React from 'react'

import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

export const HistoryContext = React.createContext(history)

export { history, Router }
