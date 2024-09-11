interface PaginateItemsProps<T> {
  items: Array<T> | undefined
  currentPageNumber: number
  itemsPerPage: number
}

interface PaginateItemsResult<T> {
  currentItems: Array<T>
  totalItems: number | undefined
  totalPagesNumber: number | undefined
}

export const paginateItems = <T>({
  items,
  currentPageNumber,
  itemsPerPage,
}: PaginateItemsProps<T>): PaginateItemsResult<T> => {
  const lastItemIndex = currentPageNumber * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const currentItems = items?.slice(firstItemIndex, lastItemIndex)

  const totalItems = items?.length
  const totalPagesNumber = totalItems
    ? Math.ceil(totalItems / itemsPerPage)
    : undefined

  return { currentItems, totalItems, totalPagesNumber }
}
