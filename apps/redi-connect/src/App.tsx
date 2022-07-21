import { graphqlClient } from '@talent-connect/data-access'
import { Loader } from '@talent-connect/shared-atomic-design-components'
import React, { Suspense, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as StoreProvider } from 'react-redux'
import { history, Router } from './services/history/history'
import { envRediLocation } from './utils/env-redi-location'
import LocationPicker from './pages/front/landing/LocationPicker'
import { Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { useConfetti } from './utils/useConfetti'
import AppNotification from './components/AppNotification'
import { Routes } from './components/Routes'

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

// TODO: put this into a lib
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const NormalRediConnect = () => {
  return (
    <>
      <AppNotification />
      <QueryClientProvider client={queryClient}>
        <Router history={history}>
          <Suspense fallback={<Loader loading={true} />}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Routes />
            </QueryParamProvider>
          </Suspense>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
