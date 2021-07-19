import { useQuery } from 'react-query'
import { fetchAllTpJobFair2021InterviewMatches_tpJobListings } from '../services/api/api'

export function useTpJobFair2021InterviewMatch_tpJobListingsQuery() {
  return useQuery(
    'allTpJobFair2021InterviewMatchTpJobListings',
    fetchAllTpJobFair2021InterviewMatches_tpJobListings,
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  )
}
