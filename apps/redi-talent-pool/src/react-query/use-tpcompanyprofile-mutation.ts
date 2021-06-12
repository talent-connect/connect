import { useMutation, useQueryClient } from 'react-query'
import { updateCurrentUserTpCompanyProfile } from '../services/api/api'

export function useTpcompanyUpdateMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    'currentUserTpCompanyProfileUpdate',
    updateCurrentUserTpCompanyProfile,
    {
      onSuccess: (data) => {
        queryClient.setQueryData('currentUserTpCompanyProfile', data)
      },
    }
  )
}
