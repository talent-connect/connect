import {
  ConnectProfileStatus,
  useLoadMyProfileQuery,
} from '@talent-connect/data-access'
import { Heading } from '@talent-connect/shared-atomic-design-components'
import { useRef } from 'react'
import { Content } from 'react-bulma-components'
import { useHistory } from 'react-router-dom'
import LoggedIn from '../../../components/templates/LoggedIn'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'
import { useGetMentorshipMatchesQuery } from './Applications.generated'
import { ApplicationsFilterContextProvider } from './ApplicationsFilterContext'
import DesktopView from './DesktopView'
import MobileView from './MobileView'

/*

1st render:
applicants = [a(pending)]
previousRenderApplicants.current = [a(pending)]

2nd render (line 31):
applicants = [a(invalidated)]
previousRenderApplicants.current = [a(pending)]

previousNumberOfApplied = 1
previousNumberOfInvalidated = 0
currentNumberOfApplied = 0
currentNumberOfInvalidated = 1

did the number of applications with status "applied" go down by one between last render and this render?

and, did the number of applications with status "invalidated" go up by one between last render and this render?

if answer to both questions is YES, then we set largeBooleanVar = true

2nd render (line 35):
applicants = [a(invalidated)]
previousRenderApplicants.current = = applicants = [a(invalidated)]

*/

function Applications() {
  const previousRenderApplicants = useRef<null | any[]>(null)
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

  let hasOneOfTheMentorshipMatchesChangedStatusFromAppliedToInvalidatedBetweenPreviousRenderAndThisRender =
    false

  // We have a complex if condition we need to write here. Some of the elements to consider:
  // - previousRenderApplicants.current == null, don't proceed: longBooleanVar = false
  // - find the number of applications with status = applied, and the number of applications with
  //   status invalidated. Do this for previousRenderApplicants and applicants.

  previousRenderApplicants.current = applicants

  return (
    <LoggedIn>
      <Heading subtitle size="small" className="double-bs">
        Applications
      </Heading>
      {hasOneOfTheMentorshipMatchesChangedStatusFromAppliedToInvalidatedBetweenPreviousRenderAndThisRender ? (
        <p>
          Yo, sorry about that, one of the applications that you saw on this
          page for mentorship with you was invalidated
        </p>
      ) : null}
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
