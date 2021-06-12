import { useQuery } from 'react-query'
import { fetchCurrentUserTpJobseekerProfile } from '../services/api/api'

interface Props {
  retry: boolean
}

export function useTpJobseekerProfileQuery(props?: Props) {
  const retry = props?.retry ?? true

  return useQuery(
    'currentUserTpJobseekerProfile',
    fetchCurrentUserTpJobseekerProfile,
    {
      staleTime: 5 * 60 * 1000,
      retry,
    }
  )
}
