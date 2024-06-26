import {
  ConnectProfileStatus,
  useLoadMyProfileQuery,
} from '@talent-connect/data-access'
import { Heading } from '@talent-connect/shared-atomic-design-components'
import { Content } from 'react-bulma-components'
import { useHistory } from 'react-router-dom'
import LoggedIn from '../../../components/templates/LoggedIn'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'
import { useGetMentorshipMatchesQuery } from './Applications.generated'
import { ApplicationsFilterContextProvider } from './ApplicationsFilterContext'
import DesktopView from './DesktopView'
import MobileView from './MobileView'

function Applications() {
  // Refetch mentorship applications every 60 seconds to handle potential invalidation
  // when another mentor accepts an application from the same mentee.
  const mentorshipMatchesQuery = useGetMentorshipMatchesQuery(
    {},
    { refetchInterval: 60 * 1000 }
  )
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const history = useHistory()

  const profile = myProfileQuery.data?.conProfile

  if (profile?.profileStatus !== ConnectProfileStatus?.Approved)
    return <LoggedIn />

  // if (mentorshipMatchesQuery.isLoading) return null

  const applicants = mentorshipMatchesQuery.data?.conMentorshipMatches

  return (
    <LoggedIn>
      <Heading subtitle size="small" className="double-bs">
        Applications
      </Heading>
      {applicants?.length !== undefined && (
        <>
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
                  chances of receiving an application, make sure that your
                  profile is up-to-date, informative and friendly.
                </>
              )}
            </Content>
          ) : (
            <ApplicationsFilterContextProvider>
              <DesktopView applicants={applicants} />

              <MobileView />
            </ApplicationsFilterContextProvider>
          )}
        </>
      )}
    </LoggedIn>
  )
}

export default Applications
