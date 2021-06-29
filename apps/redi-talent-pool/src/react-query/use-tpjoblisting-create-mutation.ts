import { useMutation, useQueryClient } from 'react-query'
import { createCurrentUserTpJobListing } from '../services/api/api'

export function useTpJobListingDeleteMutation() {
  const queryClient = useQueryClient()

  return useMutation(createCurrentUserTpJobListing, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['allTpJobListings'])
    },
  })
}
