import { ConProfile, useLoadMyProfileQuery } from '@talent-connect/data-access'
import {
  Caption,
  PipeList,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import React from 'react'
import { RootState } from '../../redux/types'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'

interface Props {
  profile: Pick<ConProfile, 'languages'>
}

const Me = ({ profile }: Props) => {
  const { languages } = profile

  if (!languages)
    return <Placeholder>Input languages you speak here.</Placeholder>

  return <PipeList items={languages} />
}

const Some = ({ profile }: Props) => {
  const { languages } = profile

  return (
    <>
      <Caption>Languages</Caption>
      {languages && <PipeList items={languages} />}
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <Me profile={myProfileQuery.data.conProfile} />
  },
  Some: ({ profile }: Props) => <Some profile={profile} />,
}
