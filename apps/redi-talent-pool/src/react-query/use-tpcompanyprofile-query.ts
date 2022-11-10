import { useQuery } from 'react-query'
import { fetchCurrentUserTpCompanyProfile, fetchTpCompanyProfileById } from '../services/api/api'

interface Props {
  retry: boolean
}

export function useTpCompanyProfileQuery(props?: Props) {
  const retry = props?.retry ?? true

  return useQuery(
    'currentUserTpCompanyProfile',
    fetchCurrentUserTpCompanyProfile,
    {
      staleTime: 5 * 60 * 1000,
      retry,
      refetchOnWindowFocus: false,
    }
  )
}

export function useTpCompanyProfileByIdQuery(id: string) {
  return useQuery(['oneTpCompanyProfile', id], () => 
    fetchTpCompanyProfileById(id)
  )
}