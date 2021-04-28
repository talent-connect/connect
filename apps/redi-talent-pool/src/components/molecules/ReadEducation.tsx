import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { educationLevelsIdToLabelMap } from '../../config/config'

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const ReadEducation = ({ profile, shortInfo }: Props) => {
  const { mentee_highestEducationLevel } = profile

  if (!mentee_highestEducationLevel) {
    return (
      <Placeholder>
        Input your information about your Education here.
      </Placeholder>
    )
  }

  return (
    <>
      {shortInfo && <Caption>Highest Education</Caption>}
      <Content>
        <p>{educationLevelsIdToLabelMap[mentee_highestEducationLevel]}</p>
      </Content>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(ReadEducation),
  Some: ({ profile }: Props) => <ReadEducation profile={profile} shortInfo />,
}
