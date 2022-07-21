import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { EDUCATION_LEVELS } from '@talent-connect/shared-config'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ConProfile, useLoadMyProfileQuery } from '@talent-connect/data-access'
import { ReadEducationProfilePropFragment } from './ReadEducation.generated'

interface Props {
  profile: ReadEducationProfilePropFragment
  shortInfo?: boolean
}

function ReadEducation({ profile, shortInfo }: Props) {
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
        <p>{EDUCATION_LEVELS[mentee_highestEducationLevel]}</p>
      </Content>
    </>
  )
}

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <ReadEducation profile={myProfileQuery.data.conProfile} />
  },
  Some: ({ profile }: Props) => <ReadEducation profile={profile} shortInfo />,
}
