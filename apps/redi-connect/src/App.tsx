import React, { useEffect, Suspense } from 'react'

import { Provider as StoreProvider } from 'react-redux'
import { history, Router } from './services/history/history'
import { Routes } from './components/Routes'
import { store } from './redux/store'
import { profileFetchStart } from './redux/user/actions'
import AppNotification from './components/AppNotification'
import { Loader } from '@talent-connect/shared-atomic-design-components'
import { envRediLocation } from './utils/env-redi-location'
import LocationPicker from './pages/front/landing/LocationPicker'
import { Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { QueryClient, QueryClientProvider } from 'react-query'

const App = () => {
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

// TODO: put this into a lib
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const NormalRediConnect = () => {
  useEffect(() => {
    store.dispatch(profileFetchStart())
  }, [])

  return (
    <>
      <AppNotification />
      <QueryClientProvider client={queryClient}>
        <StoreProvider store={store}>
          <Router history={history}>
            <Suspense fallback={<Loader loading={true} />}>
              <QueryParamProvider ReactRouterRoute={Route}>
                <Routes />
              </QueryParamProvider>
            </Suspense>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
