import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@talent-connect/shared-shadcn-ui-components'

interface PaginateProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const Paginate = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginateProps) => {
  // console.log('totalItems', totalItems)
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  // console.log('totalPages', totalPages)
  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1)
  const MAX_NUMBERED_PAGES = 5

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const renderPageNumbers = (totalPages: number, pageNumbers: number[]) => {
    return (
      <>
        {pageNumbers.slice(0, 3).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageClick(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > MAX_NUMBERED_PAGES && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageClick(totalPages)}
            isActive={totalPages === currentPage}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      </>
    )
  }

  return (
    <Pagination>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePreviousPage} />
          </PaginationItem>
          {renderPageNumbers(totalPages, pageNumbers)}
          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Pagination>
  )
}

export default Paginate
