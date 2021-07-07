import { useMutation, useQueryClient } from 'react-query'
import {
  createCurrentUserTpJobseekerCv,
  deleteCurrentUserTpJobseekerCv,
  updateCurrentUserTpJobseekerCv,
} from '../services/api/api'

export function useTpjobseekerCvCreateMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    'currentUserTpJobseekerCvCreate',
    createCurrentUserTpJobseekerCv(),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('allCurrentUserTpJobseekerCv')
        queryClient.setQueryData('currentUserTpJobseekerCvCreate', data)
      },
    }
  )
}

export function useTpjobseekerCvUpdateMutation(id: string) {
  const queryClient = useQueryClient()

  return useMutation(
    'currentUserTpJobseekerCvUpdate',
    updateCurrentUserTpJobseekerCv(id),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('allCurrentUserTpJobseekerCv')
        queryClient.invalidateQueries(['currentUserTpJobseekerCv', id])
        queryClient.setQueryData('currentUserTpJobseekerCvUpdate', data)
      },
    }
  )
}

export function useTpjobseekerCvDeleteMutation(id: string) {
  const queryClient = useQueryClient()

  return useMutation(
    'currentUserTpJobseekerCvDelete',
    deleteCurrentUserTpJobseekerCv(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('allCurrentUserTpJobseekerCv')
      },
    }
  )
}
