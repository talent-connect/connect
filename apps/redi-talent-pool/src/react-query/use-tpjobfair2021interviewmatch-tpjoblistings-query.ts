import { useQuery } from 'react-query'
import { fetchAllTpJobFair2021InterviewMatches_tpJobListings } from '../services/api/api'

const MS_IN_5_MIN = 5 * 60 * 1000

export function useTpJobFair2021InterviewMatch_tpJobListingsQuery() {
  return useQuery(
    'allTpJobFair2021InterviewMatchTpJobListings',
    fetchAllTpJobFair2021InterviewMatches_tpJobListings,
    {
      staleTime: MS_IN_5_MIN,
      refetchOnWindowFocus: false,
    }
  )
}
