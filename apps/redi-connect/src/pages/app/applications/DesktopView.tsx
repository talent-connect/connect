import { useContext } from 'react'
import { RedMatch } from '@talent-connect/shared-types'
import ApplicationCard from './application-card/ApplicationCard'
import FilterButton from './FilterButton'
import { ApplicationsFilterContext } from './ApplicationsFilterContext'
import './DesktopView.scss'

interface Props {
  applicants: RedMatch[]
}

const DesktopView = ({ applicants }: Props) => {
  const {
    filteredAndSortedApplications,
    pendingApplications,
    hasPendingApplications,
    hasAcceptedApplications,
    hasDeclinedApplications,
    hasCancelledApplications,
  } = useContext(ApplicationsFilterContext)

  return (
    <div className="desktop-tabs">
      <div className="tabs-menu">
        <FilterButton filterValue="all">
          all {Boolean(applicants.length) && `(${applicants.length})`}
        </FilterButton>
        <FilterButton
          filterValue="pending"
          isDisabled={!hasPendingApplications}
        >
          pending {hasPendingApplications && `(${pendingApplications.length})`}
        </FilterButton>
        <FilterButton
          filterValue="accepted"
          isDisabled={!hasAcceptedApplications}
        >
          accepted
        </FilterButton>
        <FilterButton
          filterValue="declined"
          isDisabled={!hasDeclinedApplications}
        >
          declined
        </FilterButton>
        <FilterButton
          filterValue="cancelled"
          isDisabled={!hasCancelledApplications}
        >
          cancelled
        </FilterButton>
      </div>
      <div>
        {filteredAndSortedApplications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </div>
  )
}

export default DesktopView
