import { useIsFetching, useIsMutating } from 'react-query'

export function useIsBusy() {
  return Boolean(useIsFetching()) || Boolean(useIsMutating())
}
