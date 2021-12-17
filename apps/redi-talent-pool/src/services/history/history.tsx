import { createBrowserHistory } from 'history'
import { createContext } from 'react'
import { Router } from 'react-router-dom'

const history = createBrowserHistory()

export const HistoryContext = createContext(history)

export { history, Router }
