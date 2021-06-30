import { useQuery } from 'react-query'
import { fetchOneTpJobListing } from '../services/api/api'

export function useTpJobListingOneQuery(id: string) {
  return useQuery(['oneTpJobListing', id], () => fetchOneTpJobListing(id), {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
