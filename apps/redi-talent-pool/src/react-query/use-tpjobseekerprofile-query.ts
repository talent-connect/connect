import { useQuery } from 'react-query'
import {
  fetchAllTpJobseekerProfiles,
  fetchCurrentUserTpJobseekerProfile,
  fetchTpJobseekerProfileById,
  TpJobseekerProfileFilters,
} from '../services/api/api'

interface Props {
  retry?: boolean
  enabled?: boolean
}

// TODO: refactor name to make clear this is a hook for fetching
// CURRENT USER's profile
export function useTpJobseekerProfileQuery(props?: Props) {
  const retry = props?.retry ?? true
  const enabled = props?.enabled ?? true

  return useQuery(
    'currentUserTpJobseekerProfile',
    fetchCurrentUserTpJobseekerProfile,
    {
      staleTime: 5 * 60 * 1000,
      enabled,
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

export function useBrowseTpJobseekerProfilesQuery(
  filters: TpJobseekerProfileFilters
) {
  return useQuery(['browseTpJobseekerProfiles', filters], () =>
    fetchAllTpJobseekerProfiles(filters)
  )
}
