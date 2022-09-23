import { RedMatch } from '@talent-connect/shared-types'
import ApplicationCard from './application-card/ApplicationCard'
import FilterButton from './FilterButton'
import { useFilter } from './useFilter'
import './DesktopView.scss'

interface Props {
  applicants: RedMatch[]
  filteredApplicants: RedMatch[]
}

const DesktopView = ({ applicants, filteredApplicants }: Props) => {
  const {
    pendingApplications,
    hasPendingApplications,
    hasAcceptedApplications,
    hasDeclinedApplications,
    hasCancelledApplications,
  } = useFilter({ applicants })

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
        {filteredApplicants.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </div>
  )
}

export default DesktopView
