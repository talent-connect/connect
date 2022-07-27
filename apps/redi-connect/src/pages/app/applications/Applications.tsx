import React, { useState } from 'react'
import { Content } from 'react-bulma-components'
import { Heading } from '@talent-connect/shared-atomic-design-components'
import LoggedIn from '../../../components/templates/LoggedIn'
import { RootState } from '../../../redux/types'
import { getApplicants } from '../../../redux/matches/selectors'
import { connect } from 'react-redux'
import { RedMatch } from '@talent-connect/shared-types'
import { useHistory } from 'react-router-dom'
import { getRedProfileFromLocalStorage } from '../../../services/auth/auth'
import MobileView from './MobileView'
import DesktopView from './DesktopView'

interface Props {
  applicants: RedMatch[]
}

function Applications({ applicants }: Props) {
  const history = useHistory()
  const profile = getRedProfileFromLocalStorage()
  const [activeFilter, setActiveFilter] = useState('all')

  if (profile.userActivated !== true) return <LoggedIn />

  const applicationsSortedByDate = applicants.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return dateA < dateB ? 1 : -1
  })

  const filterbyStatus = (item) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'pending') {
      return item.status === 'applied'
    } else if (activeFilter === 'accepted') {
      return item.status === 'accepted' || item.status === 'completed'
    } else if (activeFilter === 'declined') {
      return item.status === 'declined-by-mentor'
    } else if (activeFilter === 'cancelled') {
      return (
        item.status === 'cancelled' ||
        item.status === 'invalidated-as-other-mentor-accepted'
      )
    }
  }

  const filteredApplications = applicationsSortedByDate.filter(filterbyStatus)

  return (
    <LoggedIn>
      <Heading subtitle size="small" className="double-bs">
        Applications
      </Heading>
      {applicants.length === 0 ? (
        <Content italic>
          {profile.userType === 'mentee' && (
            <>
              You have not applied for a mentor yet.{' '}
              <a onClick={() => history.push('/app/find-a-mentor')}>
                Find your mentor here.
              </a>
            </>
          )}
          {profile.userType === 'mentor' && (
            <>
              You currently have no mentee applications. To increase your
              chances of receiving an application, make sure that your profile
              is up-to-date, informative and friendly.
            </>
          )}
        </Content>
      ) : (
        <>
          <DesktopView
            applicants={applicants}
            filteredApplicants={filteredApplications}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <MobileView
            applicants={applicants}
            filteredApplicants={filteredApplications}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </>
      )}
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  applicants: getApplicants(state.matches),
})

export default connect(mapStateToProps, null)(Applications)
