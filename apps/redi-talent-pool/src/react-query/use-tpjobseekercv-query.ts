import { useQuery } from 'react-query'
import {
  fetchAllCurrentUserTpJobseekerCv,
  fetchCurrentUserTpJobseekerCvById,
} from '../services/api/api'

interface Props {
  retry?: boolean
  enabled?: boolean
}

export function useTpJobseekerCvQuery(props?: Props) {
  const retry = props?.retry ?? true

  return useQuery(
    'allCurrentUserTpJobseekerCv',
    fetchAllCurrentUserTpJobseekerCv,
    {
      staleTime: 5 * 60 * 1000,
      retry,
      refetchOnWindowFocus: false,
    }
  )
}

export function useTpJobseekerCvByIdQuery(id: string, props?: Props) {
  const retry = props?.retry ?? true
  const enabled = props?.enabled ?? true

  return useQuery(
    ['currentUserTpJobseekerCv', id],
    () => fetchCurrentUserTpJobseekerCvById(id),
    {
      staleTime: 5 * 60 * 1000,
      retry,
      enabled,
      refetchOnWindowFocus: false,
    }
  )
}
