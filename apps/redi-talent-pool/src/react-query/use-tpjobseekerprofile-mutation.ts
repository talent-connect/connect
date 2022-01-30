import { useMutation, useQueryClient } from 'react-query'
import { updateCurrentUserTpJobSeekerProfile } from '../services/api/api'

export function useTpJobSeekerProfileUpdateMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    'currentUserTpJobSeekerProfileUpdate',
    updateCurrentUserTpJobSeekerProfile,
    {
      onSuccess: (data) => {
        queryClient.setQueryData('currentUserTpJobSeekerProfile', data)
      },
    }
  )
}
