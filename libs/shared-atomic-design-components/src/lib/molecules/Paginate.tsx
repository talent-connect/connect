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

const MAX_VISIBLE_PAGES = 5

type ActivePagesType = number | 'ellipsis'

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
    let activePages: ActivePagesType[] = []

    // Determine pagination elements with proper ellipsis handling based on the current page's position
    if (totalPagesNumber <= MAX_VISIBLE_PAGES) {
      activePages = pageNumbers
    } else if (currentPageNumber <= 3) {
      activePages = [1, 2, 3, 'ellipsis', totalPagesNumber]
    } else if (currentPageNumber >= totalPagesNumber - 2) {
      activePages = [
        1,
        'ellipsis',
        totalPagesNumber - 2,
        totalPagesNumber - 1,
        totalPagesNumber,
      ]
    } else {
      activePages = [
        1,
        'ellipsis',
        currentPageNumber,
        'ellipsis',
        totalPagesNumber,
      ]
    }

    // Map activePages to rendered pagination items
    const renderedPages = activePages.map((page, index) => {
      if (page === 'ellipsis') {
        return <PaginationEllipsis key={`ellipsis-${index}`} />
      }
      return (
        <PaginationItem
          key={page}
          className={
            currentPageNumber === page ? 'bg-[#FFEAE2] rounded-full' : ''
          }
        >
          <PaginationLink onClick={() => handlePageClick(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    })

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
