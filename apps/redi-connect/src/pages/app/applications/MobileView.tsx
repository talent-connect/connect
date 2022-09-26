import { useContext } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/types'
import { RedMatch } from '@talent-connect/shared-types'
import { Button } from '@talent-connect/shared-atomic-design-components'
import SelectDropdown from '../../../../../../libs/shared-atomic-design-components/src/lib/atoms/SelectDropdown'
import MobileApplicationCard from './application-card/MobileApplicationCard'
import { useApplicationsFilter } from './useApplicationsFilter'
import { ActiveFilterContext } from './ActiveFilterContext'
import './MobileView.scss'

const applicationStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
  { value: 'cancelled', label: 'Cancelled' },
]

interface Props {
  applicants: RedMatch[]
  filteredApplicants: RedMatch[]
}

const MobileView = ({ applicants, filteredApplicants }: Props) => {
  const profile = useSelector((state: RootState) => state.user.profile)
  const isMentor = profile.userType === 'mentor'

  const { activeFilter, handleActiveFilter } = useContext(ActiveFilterContext)

  const {
    pendingApplications,
    hasPendingApplications,
    hasAcceptedApplications,
    hasDeclinedApplications,
    hasCancelledApplications,
  } = useApplicationsFilter({ applicants })

  const activeFilterValue =
    activeFilter === 'all'
      ? null
      : applicationStatuses.find(({ value }) => value === activeFilter)

  const renderEmptyStateMessage = (filterValue: string, condition: boolean) => {
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
            setValue={handleActiveFilter}
            placeholder="Filter by Status"
          />
        </div>

        <Button
          onClick={() => handleActiveFilter('all')}
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
