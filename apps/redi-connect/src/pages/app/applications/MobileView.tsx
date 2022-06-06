import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/types'
import {
  FormSelect,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import ApplicationCard from '../../../components/organisms/ApplicationCard'
import './MobileView.scss'

const applicationStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
  { value: 'cancelled', label: 'Cancelled' },
]

const MobileView = ({ applicants, filteredApplicants, setActiveFilter }) => {
  const pendingApplicationsCount = useSelector(
    (state: RootState) => state.user.profile.currentApplicantCount
  )

  return (
    <div className="mobile-filter">
      {Boolean(pendingApplicationsCount) && (
        <div className="message">
          You have {pendingApplicationsCount} pending{' '}
          {pendingApplicationsCount === 1 ? 'application' : 'applications'}
        </div>
      )}

      <div className="filters-wrapper">
        <div className="dropdown-filter">
          <FormSelect
            items={applicationStatuses}
            placeholder="Filter by Status"
            customOnChange={(selected) => setActiveFilter(selected.value)}
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
        {filteredApplicants.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </div>
  )
}

export default MobileView
