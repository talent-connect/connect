import { useMutation, useQueryClient } from 'react-query'
import {
  createCurrentUserTpJobSeekerCv,
  deleteCurrentUserTpJobSeekerCv,
  updateCurrentUserTpJobSeekerCv,
} from '../services/api/api'

export function useTpjobseekerCvCreateMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    'currentUserTpJobSeekerCvCreate',
    createCurrentUserTpJobSeekerCv(),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('allCurrentUserTpJobSeekerCv')
        queryClient.setQueryData('currentUserTpJobSeekerCvCreate', data)
      },
    }
  )
}

export function useTpjobseekerCvUpdateMutation(id: string) {
  const queryClient = useQueryClient()

  return useMutation(
    'currentUserTpJobSeekerCvUpdate',
    updateCurrentUserTpJobSeekerCv(id),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('allCurrentUserTpJobSeekerCv')
        queryClient.invalidateQueries(['currentUserTpJobSeekerCv', id])
        queryClient.setQueryData('currentUserTpJobSeekerCvUpdate', data)
      },
    }
  )
}

export function useTpjobseekerCvDeleteMutation(id: string) {
  const queryClient = useQueryClient()

  return useMutation(
    'currentUserTpJobSeekerCvDelete',
    deleteCurrentUserTpJobSeekerCv(id),
    {
      onSuccess: () => queryClient.invalidateQueries('allCurrentUserTpJobSeekerCv'),
    }
  )
}
