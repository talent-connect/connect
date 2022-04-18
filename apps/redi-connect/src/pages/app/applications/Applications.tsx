import React, { useState } from 'react'
import { Content } from 'react-bulma-components'
import {
  Heading,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import { ApplicationCard } from '../../../components/organisms'
import LoggedIn from '../../../components/templates/LoggedIn'
import { RootState } from '../../../redux/types'
import { getApplicants } from '../../../redux/matches/selectors'
import { connect } from 'react-redux'
import { RedMatch } from '@talent-connect/shared-types'
import { NavLink, useHistory } from 'react-router-dom'
import { getRedProfileFromLocalStorage } from '../../../services/auth/auth'
import './Applications.scss'

interface Props {
  applicants: RedMatch[]
}

function Applications({ applicants }: Props) {
  const history = useHistory()
  const profile = getRedProfileFromLocalStorage()

  // const [selectedTab, setSelectedTab] = useState('All')

  if (profile.userActivated !== true) return <LoggedIn />

  // console.log('applicants', applicants)
  const pendingApplications = applicants.filter(
    (aplicant) => aplicant.status === 'applied'
  )

  const TAB_LABELS: any = {
    applied: 'Pending',
    accepted: 'Accepted',
    completed: 'Accepted',
    cancelled: 'Cancelled',
    'declined-by-mentor': 'Declined',
    'invalidated-as-other-mentor-accepted': 'Cancelled',
  }

  return (
    <LoggedIn>
      <Heading subtitle size="small" className="double-bs">
        Applications {Boolean(applicants.length) && `(${applicants.length})`}
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
        <div>
          <div className="tabs-menu">
            <Button className="tabs-menu__item--active" simple>
              all {Boolean(applicants.length) && `(${applicants.length})`}
            </Button>
            <Button className="tabs-menu__item" simple>
              pending{' '}
              {Boolean(pendingApplications.length) &&
                `(${pendingApplications.length})`}
            </Button>
            <Button className="tabs-menu__item" simple>
              accepted
            </Button>
            <Button className="tabs-menu__item" simple disabled>
              declined
            </Button>
            <Button className="tabs-menu__item" simple>
              cancelled
            </Button>
            {/* <div>
              {applicants.map((application: RedMatch) => (
                <Button simple>{TAB_LABELS[application.status]}</Button>
              ))}
            </div> */}
          </div>
          <div>
            {applicants
              .sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()
                return dateA < dateB ? 1 : -1
              })
              .map((application: RedMatch) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
          </div>
        </div>
      )}
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  applicants: getApplicants(state.matches),
})

export default connect(mapStateToProps, null)(Applications)
