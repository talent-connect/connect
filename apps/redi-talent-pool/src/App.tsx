import { Loader } from '@talent-connect/shared-atomic-design-components'
import { Suspense, useEffect } from 'react'
import { QueryClientProvider, useQueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Route, useLocation } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import AppNotification from './components/AppNotification'
import { Routes } from './components/Routes'
import { queryClient } from './services/api/api'
import {
  getAccessTokenFromLocalStorage,
  isLoggedIn,
  setGraphQlClientAuthHeader,
} from './services/auth/auth'
import { history, Router } from './services/history/history'

if (isLoggedIn()) {
  setGraphQlClientAuthHeader(getAccessTokenFromLocalStorage())
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
      <AppNotification />
      <Router history={history}>
        <Suspense fallback={<Loader loading={true} />}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <InvalidateQueriesOnNavigation>
              <Routes />
            </InvalidateQueriesOnNavigation>
          </QueryParamProvider>
        </Suspense>
      </Router>
    </QueryClientProvider>
  )
}

function InvalidateQueriesOnNavigation({
  children,
}: {
  children: React.ReactNode
}) {
  const location = useLocation()
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries()
  }, [location])

  return <>{children}</>
}

export default App
