import { Content } from 'react-bulma-components'
import { Heading } from '@talent-connect/shared-atomic-design-components'
import { ApplicationCard } from '../../../components/organisms'
import LoggedIn from '../../../components/templates/LoggedIn'
import { RootState } from '../../../redux/types'
import { getApplicants } from '../../../redux/matches/selectors'
import { connect } from 'react-redux'
import { RedMatch } from '@talent-connect/shared-types'
import { useHistory } from 'react-router-dom'
import { getRedProfileFromLocalStorage } from '../../../services/auth/auth'

interface Props {
  applicants: RedMatch[]
}

function Applications ({ applicants }: Props) {
  const history = useHistory()
  const profile = getRedProfileFromLocalStorage()

  if (!profile.userActivated) return <LoggedIn />

  return (
    <LoggedIn>
      <Heading subtitle size="small" className="double-bs">
        Applications {applicants.length && `(${applicants.length})`}
      </Heading>
      {!applicants.length ? (
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

const mapStateToProps = ({ matches }: RootState) => ({ applicants: getApplicants(matches) })

export default connect(mapStateToProps, null)(Applications)
