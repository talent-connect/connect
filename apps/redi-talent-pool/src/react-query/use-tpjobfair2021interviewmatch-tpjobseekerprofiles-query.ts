import { useQuery } from 'react-query'
import { fetchAllTpJobFair2021InterviewMatches_tpJobseekerProfiles } from '../services/api/api'

export function useTpJobFair2021InterviewMatch_tpJobseekerProfilesQuery() {
  return useQuery(
    'allTpJobFair2021InterviewMatchTpJobseekerProfiles',
    fetchAllTpJobFair2021InterviewMatches_tpJobseekerProfiles,
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  )
}
