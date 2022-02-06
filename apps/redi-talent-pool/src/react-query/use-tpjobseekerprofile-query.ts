import { useQuery } from 'react-query'
import {
  fetchAllTpJobSeekerProfiles,
  fetchCurrentUserTpJobSeekerProfile,
  fetchTpJobSeekerProfileById,
  TpJobSeekerProfileFilters,
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
    'currentUserTpJobSeekerProfile',
    fetchCurrentUserTpJobSeekerProfile,
    {
      staleTime: MS_IN_5_MIN,
      enabled: props?.enabled ?? true,
      retry: props?.retry ?? true,
      refetchOnWindowFocus: false,
    }
  )
}

export function useTpJobseekerProfileByIdQuery(id: string) {
  return useQuery(['oneTpJobSeekerProfile', id], () =>
    fetchTpJobSeekerProfileById(id)
  )
}

export function useBrowseTpJobseekerProfilesQuery(
  filters: TpJobSeekerProfileFilters
) {
  return useQuery(['browseTpJobSeekerProfiles', filters], () =>
    fetchAllTpJobSeekerProfiles(filters)
  )
}
