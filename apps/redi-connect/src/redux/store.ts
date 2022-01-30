import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from './epics'
import { rootReducer } from './reducers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: ({
      trace: boolean,
      traceLimit: number,
    }) => boolean; // TODO: boolean?
  }
}

// TODO: 'as Options' is a cheap way out, fix this
const epicMiddleware = createEpicMiddleware()

const composeEnhancers =
  (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({
      trace: true,
      traceLimit: 50,
    })
  ) ||
  compose

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(rootEpic)
