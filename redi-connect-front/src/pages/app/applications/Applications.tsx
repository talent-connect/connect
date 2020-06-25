import React, { useEffect } from 'react'
import { Content } from 'react-bulma-components'
import Heading from '../../../components/atoms/Heading'
import { ApplicationCard } from '../../../components/organisms'
import LoggedIn from '../../../components/templates/LoggedIn'
import { RootState } from '../../../redux/types'
import { getApplicants } from '../../../redux/matches/selectors'
import { connect } from 'react-redux'
import { matchesFetchStart } from '../../../redux/matches/actions'
import { FullScreenCircle } from '../../../hooks/WithLoading'
import { RedMatch } from '../../../types/RedMatch'
import { useHistory } from 'react-router-dom'
import { getRedProfile } from '../../../services/auth/auth'

interface Props {
  loading: boolean
  applicants: RedMatch[]
  matchesFetchStart: Function
}

// TODO: add type to Props
function Applications ({ loading, applicants, matchesFetchStart }: Props) {
  const history = useHistory()
  const profile = getRedProfile()

  useEffect(() => {
    matchesFetchStart()
  }, [matchesFetchStart])

  return (
    <LoggedIn>
      <FullScreenCircle loading={loading} />
      <Heading subtitle size="small" className="double-bs">Applications <span className="heading__thin"></span>({applicants.length})</Heading>
      {applicants.length === 0 && <Content italic>
        {profile.userType === 'mentee' && <>
          You have not applied for a mentor yet. <a onClick={() => history.push('/app/find-a-mentor') }>Find your mentor here.</a>
        </>}
        {profile.userType === 'mentor' && <>
          You have not received mentee applications yet. Make sure your profile is up to date and complete.
        </>}
      </Content>
      }
      {applicants.length > 0 && <>
        { applicants.map((application: RedMatch) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </>}
    </LoggedIn>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  matchesFetchStart: () => dispatch(matchesFetchStart())
})

const mapStateToProps = (state: RootState) => ({
  loading: state.matches.loading,
  applicants: getApplicants(state.matches)
})

export default connect(mapStateToProps, mapDispatchToProps)(Applications)
