import { Loader } from '@talent-connect/shared-atomic-design-components'
import { useState } from 'react'

export const useLoading = function () {
  const [loading, setLoading] = useState(false)

  return {
    Loading: () => <Loader loading={loading} />,
    isLoading: loading,
    setLoading,
    loading,
  }
}
