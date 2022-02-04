import { useQuery } from 'react-query'
import {
  fetchAllCurrentUserTpJobSeekerCv,
  fetchCurrentUserTpJobSeekerCvById,
} from '../services/api/api'

const _5_MIN = 5 * 60 * 1000;

interface Props {
  retry?: boolean
  enabled?: boolean
}

export function useTpJobSeekerCvQuery(props?: Props) {
  return useQuery(
    'allCurrentUserTpJobSeekerCv',
    fetchAllCurrentUserTpJobSeekerCv,
    {
      staleTime: _5_MIN,
      retry: props?.retry ?? true,
      refetchOnWindowFocus: false,
    }
  )
}

export function useTpJobSeekerCvByIdQuery(id: string, props?: Props) {
  return useQuery(
    ['currentUserTpJobSeekerCv', id],
    () => fetchCurrentUserTpJobSeekerCvById(id),
    {
      staleTime: _5_MIN,
      retry: props?.retry ?? true,
      enabled: props?.enabled ?? true,
      refetchOnWindowFocus: false,
    }
  )
}
