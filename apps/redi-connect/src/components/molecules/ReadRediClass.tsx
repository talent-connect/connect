import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Caption } from '@talent-connect/shared-atomic-design-components'
import { courseIdToLabelMap } from '@talent-connect/shared-config'

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const ReadRediClass = ({ profile, shortInfo }: Props) => {
  const { mentee_currentlyEnrolledInCourse } = profile

  return (
    <>
      {shortInfo && <Caption>Redi Class</Caption>}
      <Content>
        {mentee_currentlyEnrolledInCourse && (
          <p>{courseIdToLabelMap[mentee_currentlyEnrolledInCourse]}</p>
        )}
      </Content>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(ReadRediClass),
  Some: ({ profile }: Props) => <ReadRediClass profile={profile} shortInfo />,
}
