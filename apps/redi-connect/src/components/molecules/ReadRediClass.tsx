import { FunctionComponent } from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Caption } from '@talent-connect/shared-atomic-design-components'
import { COURSES } from '@talent-connect/shared-config'

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const ReadRediClass: FunctionComponent<Props> = ({
  profile: { mentee_currentlyEnrolledInCourse },
  shortInfo
}) => {
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

const mapStateToProps = ({ user: { profile }}: RootState) => ({ profile })

export default {
  Me: connect(mapStateToProps, {})(ReadRediClass),
  Some: ({ profile }: Props) => <ReadRediClass profile={profile} shortInfo />,
}
