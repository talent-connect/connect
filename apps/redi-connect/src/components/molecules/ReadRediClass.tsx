import { FC } from 'react'
import { connect } from 'react-redux'

import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import { Caption } from '@talent-connect/shared-atomic-design-components'
import { COURSES } from '@talent-connect/shared-config'
import { mapStateToProps } from '../../helpers';

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const ReadRediClass: FC<Props> = ({
  profile: { mentee_currentlyEnrolledInCourse },
  shortInfo = false
}) => {
  const COURSES_MAP = Object.fromEntries(COURSES.map(({ id, label }) => [id, label]))

  return (
    <>
      {shortInfo &&
        <Caption>Redi Class</Caption>}
      <Content>
        {mentee_currentlyEnrolledInCourse && 
          <p>{COURSES_MAP[mentee_currentlyEnrolledInCourse]}</p>}
      </Content>
    </>
  )
}

export default {
  Me: connect(mapStateToProps, {})(ReadRediClass),
  Some: ({ profile }: Props) => <ReadRediClass profile={profile} shortInfo />,
}
