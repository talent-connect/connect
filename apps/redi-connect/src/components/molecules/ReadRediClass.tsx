import { useLoadMyProfileQuery } from '@talent-connect/data-access'
import { Caption } from '@talent-connect/shared-atomic-design-components'
import { COURSES } from '@talent-connect/shared-config'
import { Content } from 'react-bulma-components'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadRediClassProfilePropFragment } from './ReadRediClass.generated'

interface Props {
  profile: ReadRediClassProfilePropFragment
  shortInfo?: boolean
}

const ReadRediClass = ({ profile, shortInfo }: Props) => {
  const { mentee_currentlyEnrolledInCourse } = profile

  const COURSES_MAP = Object.fromEntries(
    COURSES.map((course) => [course.id, course.label])
  )

  return (
    <>
      {shortInfo && <Caption>Redi Class</Caption>}
      <Content>
        {mentee_currentlyEnrolledInCourse && (
          <p>{COURSES_MAP[mentee_currentlyEnrolledInCourse]}</p>
        )}
      </Content>
    </>
  )
}

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <ReadRediClass profile={myProfileQuery.data.conProfile} />
  },
  Some: ({ profile }: Props) => <ReadRediClass profile={profile} shortInfo />,
}
