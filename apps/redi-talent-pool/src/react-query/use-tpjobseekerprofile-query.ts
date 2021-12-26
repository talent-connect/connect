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

const MS_IN_5_MIN = 5 * 60 * 1000

// TODO: refactor name to make clear this is a hook for fetching
// CURRENT USER's profile
export function useTpJobseekerProfileQuery(props?: Props) {
  return useQuery(
    'currentUserTpJobseekerProfile',
    fetchCurrentUserTpJobseekerProfile,
    {
      staleTime: MS_IN_5_MIN,
      enabled: props?.enabled ?? true,
      retry: props?.retry ?? true,
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
