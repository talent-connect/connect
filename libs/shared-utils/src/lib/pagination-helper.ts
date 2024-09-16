interface PaginateItemsParameters<T> {
  items: Array<T>
  currentPageNumber: number
  itemsPerPage: number
}

interface PaginateItemsResult<T> {
  currentItems: Array<T>
  totalItems: number
  totalPagesNumber: number
}

export const paginateItems = <T>({
  items,
  currentPageNumber,
  itemsPerPage,
}: PaginateItemsParameters<T>): PaginateItemsResult<T> => {
  const lastItemIndex = currentPageNumber * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const currentItems = items?.slice(firstItemIndex, lastItemIndex)

  const totalItems = items?.length
  const totalPagesNumber = totalItems
    ? Math.ceil(totalItems / itemsPerPage)
    : undefined

  return { currentItems, totalItems, totalPagesNumber }
}
