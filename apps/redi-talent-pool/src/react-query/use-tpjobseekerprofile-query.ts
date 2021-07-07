import { useQuery } from 'react-query'
import {
  fetchCurrentUserTpJobseekerProfile,
  fetchTpJobseekerProfileById,
} from '../services/api/api'

interface Props {
  retry: boolean
}

// TODO: refactor name to make clear this is a hook for fetching
// CURRENT USER's profile
export function useTpJobseekerProfileQuery(props?: Props) {
  const retry = props?.retry ?? true

  return useQuery(
    'currentUserTpJobseekerProfile',
    fetchCurrentUserTpJobseekerProfile,
    {
      staleTime: 5 * 60 * 1000,
      retry,
      refetchOnWindowFocus: false,
    }
  )
}

export function useTpJobseekerProfileByIdQuery(id: string) {
  return useQuery(['oneTpJobseekerProfile', id], () =>
    fetchTpJobseekerProfileById(id)
  )
}
