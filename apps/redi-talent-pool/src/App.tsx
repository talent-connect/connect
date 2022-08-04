import { Loader } from '@talent-connect/shared-atomic-design-components'
import { Suspense } from 'react'
import { QueryClientProvider } from 'react-query'
import { Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import AppNotification from './components/AppNotification'
import { Routes } from './components/Routes'
import { queryClient } from './services/api/api'
import { history, Router } from './services/history/history'
import { ReactQueryDevtools } from 'react-query/devtools'

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
            <Routes />
          </QueryParamProvider>
        </Suspense>
      </Router>
    </QueryClientProvider>
  )
}

export default App
