import { Loader } from '@talent-connect/shared-atomic-design-components'
import { Suspense } from 'react'
import { QueryClientProvider } from 'react-query'
import AppNotification from './components/AppNotification'
import { Routes } from './components/Routes'
import { queryClient } from './services/api/api'
import { history, Router } from './services/history/history'

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
