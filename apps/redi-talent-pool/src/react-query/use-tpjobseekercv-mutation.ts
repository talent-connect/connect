import { useMutation, useQueryClient } from 'react-query'
import { updateCurrentUserTpJobseekerCv } from '../services/api/api'

export function useTpjobseekerCvUpdateMutation(id: string) {
  const queryClient = useQueryClient()

  return useMutation(
    'currentUserTpJobseekerCvUpdate',
    updateCurrentUserTpJobseekerCv(id),
    {
      onSuccess: (data) => {
        queryClient.setQueryData('currentUserTpJobseekerCvUpdate', data)
      },
    }
  )
}
