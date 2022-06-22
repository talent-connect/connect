import React from 'react'
import Select from 'react-select'
import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/types'
import { Button } from '@talent-connect/shared-atomic-design-components'
import { customStyles } from '../../../../../../libs/shared-atomic-design-components/src/lib/atoms/SelectStyles'
import ApplicationCard from '../../../components/organisms/ApplicationCard'
import './MobileView.scss'

const applicationStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
  { value: 'cancelled', label: 'Cancelled' },
]

const MobileView = ({
  applicants,
  filteredApplicants,
  setActiveFilter,
  activeFilter,
}) => {
  const profile = useSelector((state: RootState) => state.user.profile)
  const isMentor = profile.userType === 'mentor'

  const pendingApplications = applicants.filter(
    (applicant) => applicant.status === 'applied'
  )
  const hasPendingApplications = Boolean(pendingApplications.length)

  const hasAcceptedApplications = applicants.some(
    (applicant) =>
      applicant.status === 'accepted' || applicant.status === 'completed'
  )

  const hasDeclinedApplications = applicants.some(
    (applicant) => applicant.status === 'declined-by-mentor'
  )

  const hasCancelledApplications = applicants.some(
    (applicant) =>
      applicant.status === 'cancelled' ||
      applicant.status === 'invalidated-as-other-mentor-accepted'
  )

  const value =
    activeFilter === 'all'
      ? null
      : applicationStatuses.find(({ value }) => value === activeFilter)

  const renderEmptyStateMessage = (filter, condition) => {
    return (
      activeFilter === filter &&
      condition &&
      `You currently have no ${filter} applications.`
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
          <Select
            value={value}
            options={applicationStatuses}
            onChange={(selected) => setActiveFilter(selected.value)}
            placeholder="Filter by Status"
            styles={customStyles}
            isSearchable={false}
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

        {filteredApplicants.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </div>
  )
}

export default MobileView
