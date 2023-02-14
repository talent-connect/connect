import {
  ConnectProfileStatus,
  MentorshipMatchStatus,
  useLoadMyProfileQuery,
} from '@talent-connect/data-access'
import { Heading } from '@talent-connect/shared-atomic-design-components'
import { Content } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import { ApplicationCard } from '../../../components/organisms'
import LoggedIn from '../../../components/templates/LoggedIn'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'
import { useGetMentorshipMatchesQuery } from './Applications.generated'

function Applications() {
  const queryClient = useQueryClient()
  const mentorshipMatchesQuery = useGetMentorshipMatchesQuery()
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const history = useHistory()

  if (!myProfileQuery.isSuccess) return null

  const profile = myProfileQuery.data.conProfile

  if (profile.profileStatus !== ConnectProfileStatus.Approved)
    return <LoggedIn />

  if (mentorshipMatchesQuery.isLoading) return null

  const applicants = mentorshipMatchesQuery.data?.conMentorshipMatches?.filter(
    (match) => match.status === MentorshipMatchStatus.Applied
  )

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
          .map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))
      )}
    </LoggedIn>
  )
}

export default Applications
