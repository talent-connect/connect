import React from 'react'

import { Button } from '@talent-connect/shared-atomic-design-components'
import './TabsMenu.scss'

const TabsMenu = ({ applicants, activeTab, setActiveTab }) => {
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

  const handleActiveTab = (tabName) => {
    setActiveTab(tabName)
  }
  const getClassName = (tabName) => {
    return activeTab === tabName ? 'tabs-menu__item--active' : 'tabs-menu__item'
  }

  return (
    <div className="tabs-menu">
      <Button
        onClick={() => handleActiveTab('all')}
        className={getClassName('all')}
        simple
      >
        all {Boolean(applicants.length) && `(${applicants.length})`}
      </Button>
      <Button
        onClick={() => handleActiveTab('pending')}
        className={getClassName('pending')}
        simple
        disabled={!hasPendingApplications}
      >
        pending {hasPendingApplications && `(${pendingApplications.length})`}
      </Button>
      <Button
        onClick={() => handleActiveTab('accepted')}
        className={getClassName('accepted')}
        simple
        disabled={!hasAcceptedApplications}
      >
        accepted
      </Button>
      <Button
        onClick={() => handleActiveTab('declined')}
        className={getClassName('declined')}
        simple
        disabled={!hasDeclinedApplications}
      >
        declined
      </Button>
      <Button
        onClick={() => handleActiveTab('cancelled')}
        className={getClassName('cancelled')}
        simple
        disabled={!hasCancelledApplications}
      >
        cancelled
      </Button>
    </div>
  )
}

export default TabsMenu
