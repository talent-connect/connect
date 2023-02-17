import { useLoadMyProfileQuery } from '@talent-connect/data-access'
import { useContext } from 'react'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'
import ApplicationCard from './application-card/ApplicationCard'
import { ApplicationsPageApplicationFragment } from './Applications.generated'
import { ApplicationsFilterContext } from './ApplicationsFilterContext'
import './DesktopView.scss'
import FilterButton from './FilterButton'

interface Props {
  applicants: ApplicationsPageApplicationFragment[]
}

const DesktopView = ({ applicants }: Props) => {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

  const hasReachedMenteeLimit =
    myProfileQuery.data.conProfile.doesNotHaveAvailableMentorshipSlot

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
          <ApplicationCard
            key={application.id}
            application={application}
            hasReachedMenteeLimit={hasReachedMenteeLimit}
          />
        ))}
      </div>
    </div>
  )
}

export default DesktopView
