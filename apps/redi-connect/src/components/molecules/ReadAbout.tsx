import { ConProfile, useLoadMyProfileQuery } from '@talent-connect/data-access'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import { Content } from 'react-bulma-components'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadAboutProfilePropFragment } from './ReadAbout.generated'

interface Props {
  profile: ReadAboutProfilePropFragment
}

const Me = ({ profile }: Props) => {
  const { personalDescription, expectations } = profile

  if (!personalDescription && !expectations) {
    return <Placeholder>Please tell us a bit about yourself</Placeholder>
  }

  return (
    <Content>
      {personalDescription && <p>{personalDescription}</p>}
      {expectations && <p>{expectations}</p>}
    </Content>
  )
}

const Some = ({ profile }: Props) => {
  const { fullName, personalDescription, expectations } = profile

  return (
    <>
      <Caption>About {fullName}</Caption>
      <Content>
        {personalDescription && <p>{personalDescription}</p>}
        {expectations && <p>{expectations}</p>}
      </Content>
    </>
  )
}

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <Me profile={myProfileQuery.data.conProfile} />
  },
  Some: ({ profile }: Props) => <Some profile={profile} />,
}
