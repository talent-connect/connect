import {
  AppNotification,
  Loader,
} from '@talent-connect/shared-atomic-design-components'
import { Suspense } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
  useIsMutating,
} from 'react-query'
import { Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { Routes } from './components/Routes'
import LocationPicker from './pages/front/landing/LocationPicker'
import {
  getAccessTokenFromLocalStorage,
  isLoggedIn,
  setGraphQlClientAuthHeader,
} from './services/auth/auth'
import { Router, history } from './services/history/history'
import { envRediLocation } from './utils/env-redi-location'
import { useConfetti } from './utils/useConfetti'

function App() {
  useConfetti({ keybind: 'm i r i a m a l w a y s r e d i' })
  useConfetti({ keybind: 'a s y a a l w a y s r e d i' })

  switch (envRediLocation()) {
    case 'location-picker':
      return (
        <Suspense fallback={<Loader loading={true} />}>
          <LocationPicker />
        </Suspense>
      )

    default:
      return <NormalRediConnectWrapper />
  }
}

// TODO: put this into a lib
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 5 * 60 * 1000,

      //! TODO: Investigate which one of the following or combination thereof is ideal
      // docs here: https://react-query-v3.tanstack.com/guides/important-defaults
      // staleTime: 5 * 60 * 1000,
      refetchOnMount: false,
    },
  },
})

if (isLoggedIn()) {
  setGraphQlClientAuthHeader(getAccessTokenFromLocalStorage())
}

function NormalRediConnectWrapper() {
  return (
    <>
      <AppNotification />
      <QueryClientProvider client={queryClient}>
        <NormalRediConnect />
      </QueryClientProvider>
    </>
  )
}

function NormalRediConnect() {
  const ongoingFetchCount = useIsFetching()
  const ongoingMutatationCount = useIsMutating()
  const isFetching = ongoingFetchCount > 0 || ongoingMutatationCount > 0

  return (
    <Router history={history}>
      <Suspense fallback={<Loader loading={true} />}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Loader loading={isFetching} />
          <Routes />
        </QueryParamProvider>
      </Suspense>
    </Router>
  )
}

export default App
