import { useContext } from 'react'

import { useLoadMyProfileQuery, UserType } from '@talent-connect/data-access'
import { Button } from '@talent-connect/shared-atomic-design-components'
import SelectDropdown from '../../../../../../libs/shared-atomic-design-components/src/lib/atoms/SelectDropdown'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'
import MobileApplicationCard from './application-card/MobileApplicationCard'
import {
  ActiveFilterType,
  ApplicationsFilterContext,
} from './ApplicationsFilterContext'
import './MobileView.scss'

const applicationStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
  { value: 'cancelled', label: 'Cancelled' },
]

const MobileView = () => {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

  const {
    activeFilter,
    setActiveFilter,
    filteredAndSortedApplications,
    pendingApplications,
    hasPendingApplications,
    hasAcceptedApplications,
    hasDeclinedApplications,
    hasCancelledApplications,
  } = useContext(ApplicationsFilterContext)

  if (!myProfileQuery.isSuccess) return null

  const profile = myProfileQuery.data.conProfile

  const isMentor = profile.userType === UserType.Mentor

  const activeFilterValue =
    activeFilter === 'all'
      ? null
      : applicationStatuses.find(({ value }) => value === activeFilter)

  const renderEmptyStateMessage = (
    filterValue: ActiveFilterType,
    condition: boolean
  ) => {
    return (
      activeFilter === filterValue &&
      condition &&
      `You currently have no ${filterValue} applications.`
    )
  }

  return (
    <div className="mobile-filter">
      {isMentor && hasPendingApplications && (
        <div className="message">
          You have {pendingApplications.length} pending{' '}
          {pendingApplications.length === 1 ? 'application' : 'applications'}
        </div>
      )}

      <div className="filters-wrapper">
        <div className="dropdown-filter">
          <SelectDropdown
            selectedValue={activeFilterValue}
            options={applicationStatuses}
            setValue={setActiveFilter}
            placeholder="Filter by Status"
          />
        </div>

        <Button
          onClick={() => setActiveFilter('all')}
          className="all-filter"
          simple
        >
          Show all
        </Button>
      </div>

      <div>
        {renderEmptyStateMessage('pending', !hasPendingApplications)}
        {renderEmptyStateMessage('accepted', !hasAcceptedApplications)}
        {renderEmptyStateMessage('declined', !hasDeclinedApplications)}
        {renderEmptyStateMessage('cancelled', !hasCancelledApplications)}

        {filteredAndSortedApplications.map((application) => (
          <MobileApplicationCard
            key={application.id}
            application={application}
          />
        ))}
      </div>
    </div>
  )
}

export default MobileView
