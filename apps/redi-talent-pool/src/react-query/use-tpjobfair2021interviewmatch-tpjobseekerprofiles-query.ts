import { useQuery } from 'react-query'
import { fetchAllTpJobFair2021InterviewMatches_tpJobseekerProfiles } from '../services/api/api'

const MS_IN_5_MIN = 5 * 60 * 1000

export function useTpJobFair2021InterviewMatch_tpJobseekerProfilesQuery() {
  return useQuery(
    'allTpJobFair2021InterviewMatchTpJobseekerProfiles',
    fetchAllTpJobFair2021InterviewMatches_tpJobseekerProfiles,
    {
      staleTime: MS_IN_5_MIN,
      refetchOnWindowFocus: false,
    }
  )
}
