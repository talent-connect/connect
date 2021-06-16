import { useMutation, useQueryClient } from 'react-query'
import { updateCurrentUserTpJobseekerProfile } from '../services/api/api'

export function useTpjobseekerprofileUpdateMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    'currentUserTpJobseekerProfileUpdate',
    updateCurrentUserTpJobseekerProfile,
    {
      onSuccess: (data) => {
        queryClient.setQueryData('currentUserTpJobseekerProfile', data)
      },
    }
  )
}
