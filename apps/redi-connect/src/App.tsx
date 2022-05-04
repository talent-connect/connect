import { graphqlClient } from '@talent-connect/data-access'
import { Loader } from '@talent-connect/shared-atomic-design-components'
import React, { Suspense, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as StoreProvider } from 'react-redux'
import { Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import AppNotification from './components/AppNotification'
import { Routes } from './components/Routes'
import LocationPicker from './pages/front/landing/LocationPicker'
import { getAccessTokenFromLocalStorage } from './services/auth/auth'
import { history, Router } from './services/history/history'
import { envRediLocation } from './utils/env-redi-location'

//! TODO: find a better place to ... place this "connector logic"
const authToken = getAccessTokenFromLocalStorage()
if (authToken) {
  graphqlClient.setHeader('Authorization', `Bearer ${authToken.jwtToken}`)
}

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
