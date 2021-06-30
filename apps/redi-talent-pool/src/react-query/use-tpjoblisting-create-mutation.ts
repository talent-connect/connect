import { useMutation, useQueryClient } from 'react-query'
import { createCurrentUserTpJobListing } from '../services/api/api'

export function useTpJobListingCreateMutation() {
  const queryClient = useQueryClient()

  return useMutation(createCurrentUserTpJobListing, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['allTpJobListings'])
    },
  })
}
