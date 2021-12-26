import { useQuery } from 'react-query'
import {
  fetchAllTpJobListings,
  fetchAllTpJobListingsUsingFilters,
  TpJobListingFilters,
} from '../services/api/api'

const MS_IN_5_MIN = 5 * 60 * 1000

export function useTpJobListingAllQuery() {
  return useQuery('allTpJobListings', fetchAllTpJobListings, {
    staleTime: MS_IN_5_MIN,
    refetchOnWindowFocus: false,
  })
}

export function useBrowseTpJobListingsQuery(filters: TpJobListingFilters) {
  return useQuery(['browseTpJobListings', filters], () =>
    fetchAllTpJobListingsUsingFilters(filters)
  )
}
