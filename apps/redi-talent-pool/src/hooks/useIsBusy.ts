import { useIsFetching, useIsMutating } from 'react-query'

export function useIsBusy() {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const isBusy = Boolean(isFetching) || Boolean(isMutating)

  return isBusy
}
