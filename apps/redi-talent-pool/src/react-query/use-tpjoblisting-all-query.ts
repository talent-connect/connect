import { useQuery } from 'react-query'
import {
  fetchAllTpJobListings,
  fetchAllTpJobListingsUsingFilters,
  TpJobListingFilters,
  fetchExpiredTpJobListings,
  fetchActiveTpJobListings,
} from '../services/api/api'

export function useTpJobListingAllQuery() {
  return useQuery('allTpJobListings', fetchAllTpJobListings, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useTpJobExpiredListingQuery() {
  return useQuery('expiredTpJobListings', fetchExpiredTpJobListings, {
    refetchOnWindowFocus: false,
  })
}

export function useTpJobActiveListingQuery() {
  return useQuery('activeTpJobListings', fetchActiveTpJobListings, {
    refetchOnWindowFocus: false,
  })
}

export function useBrowseTpJobListingsQuery(filters: TpJobListingFilters) {
  return useQuery(['browseTpJobListings', filters], () =>
    fetchAllTpJobListingsUsingFilters(filters)
  )
}
