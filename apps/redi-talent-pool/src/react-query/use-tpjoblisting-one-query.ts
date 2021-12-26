import { useQuery } from 'react-query'
import {
  fetchOneTpJobListing,
  fetchOneTpJobListingOfCurrentUser,
} from '../services/api/api'

const MS_IN_5_MIN = 5 * 60 * 1000

export function useTpJobListingOneOfCurrentUserQuery(id: string) {
  return useQuery(
    ['oneTpJobListingOfCurrentUser', id],
    () => fetchOneTpJobListingOfCurrentUser(id),
    {
      staleTime: MS_IN_5_MIN,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  )
}

export function useTpJobListingOneQuery(id: string) {
  return useQuery(['oneTpJobListing', id], () => fetchOneTpJobListing(id), {
    staleTime: MS_IN_5_MIN,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
