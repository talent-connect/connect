import { useQuery } from 'react-query'
import {
  fetchAllTpJobListings,
  fetchAllTpJobListingsOfOneUser,
  fetchAllTpJobListingsUsingFilters,
  TpJobListingFilters,
} from '../services/api/api'

export function useTpJobListingAllQuery() {
  return useQuery('allTpJobListings', fetchAllTpJobListings, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useTpJobListingAllOfOneUserQuery(id: string) {
  return useQuery(['allTpJobListingsOfOneUser', id], () =>
    fetchAllTpJobListingsOfOneUser(id), 
    {
      refetchOnWindowFocus: false,
    })
}

export function useBrowseTpJobListingsQuery(filters: TpJobListingFilters) {
  return useQuery(['browseTpJobListings', filters], () =>
    fetchAllTpJobListingsUsingFilters(filters)
  )
}
