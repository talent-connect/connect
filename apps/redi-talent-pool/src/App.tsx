import { Suspense } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { history, Router } from './services/history/history'
import { Routes } from './components/Routes'
import AppNotification from './components/AppNotification'
import { Loader } from '@talent-connect/shared-atomic-design-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { queryClient } from './services/api/api'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNotification />
      <Router history={history}>
        <Suspense fallback={<Loader loading={true} />}>
          <Routes />
        </Suspense>
      </Router>
    </QueryClientProvider>
  )
}

export default App
