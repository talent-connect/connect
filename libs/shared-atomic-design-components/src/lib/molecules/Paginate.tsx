import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@talent-connect/shared-shadcn-ui-components'
import './Paginate.scss'

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
    const renderedPages = activePages.map((page, index) => {
      if (page === 'ellipsis') {
        return <PaginationEllipsis key={`ellipsis-${index}`} />
      }
      return (
        <PaginationItem key={page}>
          <PaginationLink
            onClick={() => handlePageClick(page)}
            isActive={currentPageNumber === page}
          >
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
            disabled={currentPageNumber === 1}
            className="icon-hover"
          />
        </PaginationItem>
        {renderPages()}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextPage}
            disabled={currentPageNumber === totalPagesNumber}
            className="icon-hover"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Paginate
