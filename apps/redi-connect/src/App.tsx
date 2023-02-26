import { Suspense, useEffect } from 'react'

import { Loader } from '@talent-connect/shared-atomic-design-components'
import { Provider as StoreProvider } from 'react-redux'
import { Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import AppNotification from './components/AppNotification'
import { Routes } from './components/Routes'
import LocationPicker from './pages/front/landing/LocationPicker'
import { store } from './redux/store'
import { profileFetchStart } from './redux/user/actions'
import { history, Router } from './services/history/history'
import { envRediLocation } from './utils/env-redi-location'
import { useConfetti } from './utils/useConfetti'

const App = () => {
  useConfetti({ keybind: 'm i r i a m a l w a y s r e d i' })

  switch (envRediLocation()) {
    case 'location-picker':
      return (
        <Suspense fallback={<Loader loading={true} />}>
          <LocationPicker />
        </Suspense>
      )

    default:
      return <NormalRediConnect />
  }
}

const NormalRediConnect = () => {
  useEffect(() => {
    store.dispatch(profileFetchStart())
  }, [])

  return (
    <>
      <AppNotification />
      <StoreProvider store={store}>
        <Router history={history}>
          <Suspense fallback={<Loader loading={true} />}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Routes />
            </QueryParamProvider>
          </Suspense>
        </Router>
      </StoreProvider>
    </>
  )
}

export default App
