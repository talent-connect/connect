import { useMutation, useQueryClient } from 'react-query'
import { deleteCurrentUserTpJobListing } from '../services/api/api'

export function useTpJobListingDeleteMutation() {
  const queryClient = useQueryClient()

  return useMutation(deleteCurrentUserTpJobListing, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['allTpJobListings'])
      queryClient.invalidateQueries(['expiredTpJobListings'])
      queryClient.invalidateQueries(['activeTpJobListings'])
      queryClient.invalidateQueries(['oneTpJobListing', data.id])
    },
  })
}
