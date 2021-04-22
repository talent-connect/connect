import React, { useState } from 'react'
import { Loader } from '../components/atoms'

export const useLoading = function () {
  const [loading, setLoading] = useState(false)

  return {
    Loading: () => <Loader loading={loading} />,
    isLoading: loading,
    setLoading,
    loading,
  }
}
