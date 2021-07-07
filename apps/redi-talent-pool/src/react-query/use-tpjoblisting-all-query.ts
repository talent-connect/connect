import { useQuery } from 'react-query'
import { fetchAllTpJobListings } from '../services/api/api'

export function useTpJobListingAllQuery() {
  return useQuery('allTpJobListings', fetchAllTpJobListings, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
