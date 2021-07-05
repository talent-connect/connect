import { useQuery } from 'react-query'
import {
  fetchOneTpJobListing,
  fetchOneTpJobListingOfCurrentUser,
} from '../services/api/api'

export function useTpJobListingOneOfCurrentUserQuery(id: string) {
  return useQuery(
    ['oneTpJobListingOfCurrentUser', id],
    () => fetchOneTpJobListingOfCurrentUser(id),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  )
}

export function useTpJobListingOneQuery(id: string) {
  return useQuery(['oneTpJobListing', id], () => fetchOneTpJobListing(id), {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
