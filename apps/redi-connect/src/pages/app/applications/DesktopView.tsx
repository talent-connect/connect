import React from 'react'

import { RedMatch } from '@talent-connect/shared-types'
import { Button } from '@talent-connect/shared-atomic-design-components'
import ApplicationCard from './application-card/ApplicationCard'
import { useFilter } from './useFilter'
import './DesktopView.scss'

interface Props {
  applicants: RedMatch[]
  filteredApplicants: RedMatch[]
  activeFilter: string
  setActiveFilter: (filterValue: string) => void
}

const DesktopView = ({
  applicants,
  filteredApplicants,
  activeFilter,
  setActiveFilter,
}: Props) => {
  const {
    pendingApplications,
    hasPendingApplications,
    hasAcceptedApplications,
    hasDeclinedApplications,
    hasCancelledApplications,
  } = useFilter({ applicants })

  const handleActiveFilter = (tabName: string) => {
    setActiveFilter(tabName)
  }

  const getClassName = (tabName: string) => {
    return activeFilter === tabName
      ? 'tabs-menu__item--active'
      : 'tabs-menu__item'
  }

  return (
    <div className="desktop-tabs">
      <div className="tabs-menu">
        <Button
          onClick={() => handleActiveFilter('all')}
          className={getClassName('all')}
          simple
        >
          all {Boolean(applicants.length) && `(${applicants.length})`}
        </Button>
        <Button
          onClick={() => handleActiveFilter('pending')}
          className={getClassName('pending')}
          simple
          disabled={!hasPendingApplications}
        >
          pending {hasPendingApplications && `(${pendingApplications.length})`}
        </Button>
        <Button
          onClick={() => handleActiveFilter('accepted')}
          className={getClassName('accepted')}
          simple
          disabled={!hasAcceptedApplications}
        >
          accepted
        </Button>
        <Button
          onClick={() => handleActiveFilter('declined')}
          className={getClassName('declined')}
          simple
          disabled={!hasDeclinedApplications}
        >
          declined
        </Button>
        <Button
          onClick={() => handleActiveFilter('cancelled')}
          className={getClassName('cancelled')}
          simple
          disabled={!hasCancelledApplications}
        >
          cancelled
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

export default DesktopView
