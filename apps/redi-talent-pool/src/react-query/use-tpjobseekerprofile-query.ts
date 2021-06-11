import { useQuery } from 'react-query'
import { fetchCurrentUserTpJobseekerProfile } from '../services/api/api'

export function useTpjobseekerprofileQuery() {
  return useQuery(
    'currentUserTpJobseekerProfile',
    fetchCurrentUserTpJobseekerProfile,
    {
      staleTime: 5 * 60 * 1000,
    }
  )
}
