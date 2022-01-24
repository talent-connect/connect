import { useIsFetching, useIsMutating } from 'react-query'

export function useIsBusy() {
  return !!useIsFetching() || !!useIsMutating()
}
