import { useQuery } from 'react-query'
import { fetchCurrentUserTpCompanyProfile } from '../services/api/api'

interface Props {
  retry: boolean
}

const MS_IN_5_MIN = 5 * 60 * 1000

export function useTpCompanyProfileQuery(props?: Props) {
  const retry = props?.retry ?? true

  return useQuery(
    'currentUserTpCompanyProfile',
    fetchCurrentUserTpCompanyProfile,
    {
      staleTime: MS_IN_5_MIN,
      retry,
      refetchOnWindowFocus: false,
    }
  )
}
