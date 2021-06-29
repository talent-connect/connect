import { useMutation, useQueryClient } from 'react-query'
import { deleteCurrentUserTpJobListing } from '../services/api/api'

export function useTpJobListingDeleteMutation() {
  const queryClient = useQueryClient()

  return useMutation(deleteCurrentUserTpJobListing, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        'allTpJobListings',
        ['oneTpJobListing', data.id],
      ])
    },
  })
}
