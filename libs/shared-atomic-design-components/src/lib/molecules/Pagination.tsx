import {
  Pagination as ShadcnPagination,
  PaginationContent as ShadcnPaginationContent,
  PaginationEllipsis as ShadcnPaginationEllipsis,
  PaginationItem as ShadcnPaginationItem,
  PaginationLink as ShadcnPaginationLink,
  PaginationNext as ShadcnPaginationNext,
  PaginationPrevious as ShadcnPaginationPrevious,
} from '@talent-connect/shared-shadcn-ui-components'
import './Pagination.scss'

interface PaginateProps {
  totalPagesNumber: number
  currentPageNumber: number
  setCurrentPageNumber: (page: number) => void
}

type ActivePagesType = number | 'ellipsis'

const MAX_VISIBLE_PAGES = 5

const Paginate = ({
  totalPagesNumber,
  currentPageNumber,
  setCurrentPageNumber,
}: PaginateProps) => {
  if (!totalPagesNumber) return null

  const scrollToListTop = () => {
    window.scrollTo({ top: 350, behavior: 'smooth' })
  }

  const handlePreviousPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1)
    }
    scrollToListTop()
  }

  const handlePageClick = (page: number) => {
    setCurrentPageNumber(page)
    scrollToListTop()
  }

  const handleNextPage = () => {
    if (currentPageNumber < totalPagesNumber) {
      setCurrentPageNumber(currentPageNumber + 1)
    }
    scrollToListTop()
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
    const renderedPages = activePages.map((page, index) =>
      page === 'ellipsis' ? (
        <ShadcnPaginationEllipsis key={`ellipsis-${index}`} />
      ) : (
        <ShadcnPaginationItem key={page}>
          <ShadcnPaginationLink
            onClick={() => handlePageClick(page)}
            isActive={currentPageNumber === page}
          >
            {page}
          </ShadcnPaginationLink>
        </ShadcnPaginationItem>
      )
    )

    return renderedPages
  }

  return (
    <ShadcnPagination>
      <ShadcnPaginationContent>
        <ShadcnPaginationItem>
          <ShadcnPaginationPrevious
            onClick={handlePreviousPage}
            disabled={currentPageNumber === 1}
            className="icon-hover"
          />
        </ShadcnPaginationItem>
        {renderPages()}
        <ShadcnPaginationItem>
          <ShadcnPaginationNext
            onClick={handleNextPage}
            disabled={currentPageNumber === totalPagesNumber}
            className="icon-hover"
          />
        </ShadcnPaginationItem>
      </ShadcnPaginationContent>
    </ShadcnPagination>
  )
}

export default Paginate
