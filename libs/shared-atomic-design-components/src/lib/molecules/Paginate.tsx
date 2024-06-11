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
  totalPagesNumber: number
  currentPageNumber: number
  setCurrentPageNumber: (page: number) => void
}

const MAX_VISIBLE_PAGES = 3

const Paginate = ({
  totalPagesNumber,
  currentPageNumber,
  setCurrentPageNumber,
}: PaginateProps) => {
  if (!totalPagesNumber) return null

  const handlePreviousPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1)
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPageNumber(page)
  }

  const handleNextPage = () => {
    if (currentPageNumber < totalPagesNumber) {
      setCurrentPageNumber(currentPageNumber + 1)
    }
  }

  const renderPages = () => {
    const pageNumbers = [...Array(totalPagesNumber).keys()].map((i) => i + 1)
    let activePages: number[] = []

    // Determine pages to display based on the current page and total pages number
    if (totalPagesNumber <= 5) {
      activePages = pageNumbers
    } else if (currentPageNumber <= 3) {
      activePages = [
        ...pageNumbers.slice(0, MAX_VISIBLE_PAGES),
        totalPagesNumber,
      ]
    } else if (currentPageNumber >= totalPagesNumber - 2) {
      activePages = [
        1,
        ...pageNumbers.slice(totalPagesNumber - MAX_VISIBLE_PAGES),
      ]
    } else {
      activePages = [
        ...pageNumbers.slice(currentPageNumber - 2, currentPageNumber + 1),
        totalPagesNumber,
      ]
    }

    // Map activePages to rendered pagination items
    const renderedPages = activePages.map((page) => (
      <PaginationItem
        key={page}
        className={
          currentPageNumber === page ? 'bg-[#FFEAE2] rounded-full' : ''
        }
      >
        <PaginationLink
          onClick={() => handlePageClick(page)}
          // isActive={currentPageNumber === page}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ))

    // Ellipsis handling
    if (totalPagesNumber > 5) {
      if (currentPageNumber <= 3) {
        // Add ellipsis before the last page if current page is at the beginning
        renderedPages.splice(
          renderedPages.length - 1,
          0,
          <PaginationEllipsis key="ellipsis-end" />
        )
      } else if (currentPageNumber >= totalPagesNumber - 2) {
        // Add ellipsis after the first page if current page is at the end
        renderedPages.splice(1, 0, <PaginationEllipsis key="ellipsis-start" />)
      } else {
        // Add ellipsis before the last page if current page is in the middle
        renderedPages.splice(
          renderedPages.length - 1,
          0,
          <PaginationEllipsis key="ellipsis-end" />
        )
      }
    }

    return renderedPages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousPage}
            className={
              currentPageNumber === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
        {renderPages()}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextPage}
            className={
              currentPageNumber === totalPagesNumber
                ? 'pointer-events-none opacity-50'
                : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Paginate
