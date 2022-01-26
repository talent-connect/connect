import { useQuery } from 'react-query'
import { fetchAllTpJobFair2021InterviewMatches_tpJobSeekerProfiles } from '../services/api/api'

const MS_IN_5_MIN = 5 * 60 * 1000

export function useTpJobFair2021InterviewMatch_tpJobSeekerProfilesQuery() {
  return useQuery(
    'allTpJobFair2021InterviewMatchTpJobSeekerProfiles',
    fetchAllTpJobFair2021InterviewMatches_tpJobSeekerProfiles,
    {
      staleTime: MS_IN_5_MIN,
      refetchOnWindowFocus: false,
    }
  )
}
