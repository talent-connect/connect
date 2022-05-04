import React from 'react'
import { Content } from 'react-bulma-components'
import { Heading } from '@talent-connect/shared-atomic-design-components'
import { ApplicationCard } from '../../../components/organisms'
import LoggedIn from '../../../components/templates/LoggedIn'
import { connect } from 'react-redux'
import { RedMatch } from '@talent-connect/shared-types'
import { useHistory } from 'react-router-dom'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'
import {
  ConnectProfileStatus,
  useLoadMyProfileQuery,
} from '@talent-connect/data-access'

interface Props {
  applicants: RedMatch[]
}

function Applications({ applicants }: Props) {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const history = useHistory()

  if (!myProfileQuery.isSuccess) return null

  const profile = myProfileQuery.data.conProfile

  if (profile.profileStatus !== ConnectProfileStatus.Approved)
    return <LoggedIn />

  return (
    <LoggedIn>
      <Heading subtitle size="small" className="double-bs">
        Applications {Boolean(applicants.length) && `(${applicants.length})`}
      </Heading>
      {applicants.length === 0 ? (
        <Content italic>
          {profile.userType === 'MENTEE' && (
            <>
              You have not applied for a mentor yet.{' '}
              <a onClick={() => history.push('/app/find-a-mentor')}>
                Find your mentor here.
              </a>
            </>
          )}
          {profile.userType === 'MENTOR' && (
            <>
              You currently have no mentee applications. To increase your
              chances of receiving an application, make sure that your profile
              is up-to-date, informative and friendly.
            </>
          )}
        </Content>
      ) : (
        applicants
          .sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime()
            const dateB = new Date(b.createdAt).getTime()
            return dateA < dateB ? 1 : -1
          })
          .map((application: RedMatch) => (
            <ApplicationCard key={application.id} application={application} />
          ))
      )}
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  applicants: getApplicants(state.matches),
})

export default connect(mapStateToProps, null)(Applications)
