import React from 'react'
import { Content } from 'react-bulma-components'
import { Heading } from '@talent-connect/shared-atomic-design-components'
import { ApplicationCard } from '../../../components/organisms'
import LoggedIn from '../../../components/templates/LoggedIn'
import { RootState } from '../../../redux/types'
import { getApplicants } from '../../../redux/matches/selectors'
import { connect } from 'react-redux'
import { RedMatch } from '../../../types/RedMatch'
import { useHistory } from 'react-router-dom'
import { getRedProfile } from '../../../services/auth/auth'

interface Props {
  applicants: RedMatch[]
}

function Applications({ applicants }: Props) {
  const history = useHistory()
  const profile = getRedProfile()

  return (
    <LoggedIn>
      <Heading subtitle size="small" className="double-bs">
        Applications {Boolean(applicants.length) && `(${applicants.length})`}
      </Heading>
      {applicants.length === 0 && (
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
              You have not received mentee applications yet. Make sure your
              profile is up to date and complete.
            </>
          )}
        </Content>
      )}
      {applicants.length > 0 && (
        <>
          {applicants.map((application: RedMatch) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </>
      )}
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  applicants: getApplicants(state.matches),
})

export default connect(mapStateToProps, null)(Applications)
