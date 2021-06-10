import { useQuery } from 'react-query'
import { fetchCurrentUserTpJobseekerProfile } from '../services/api/api'

export function useTpjobseekerprofileQuery() {
  return useQuery(
    'currentUserTpJobseekerProfile',
    fetchCurrentUserTpJobseekerProfile
  )
}
