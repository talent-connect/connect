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
  return useQuery(
    'allCurrentUserTpJobseekerCv',
    fetchAllCurrentUserTpJobseekerCv,
    {
      staleTime: 5 * 60 * 1000,
      retry: props?.retry ?? true,
      refetchOnWindowFocus: false,
    }
  )
}

export function useTpJobseekerCvByIdQuery(id: string, props?: Props) {
  return useQuery(
    ['currentUserTpJobseekerCv', id],
    () => fetchCurrentUserTpJobseekerCvById(id),
    {
      staleTime: 5 * 60 * 1000,
      retry: props?.retry ?? true,
      enabled: props?.enabled ?? true,
      refetchOnWindowFocus: false,
    }
  )
}
