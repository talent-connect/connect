import { ConProfile, useLoadMyProfileQuery } from '@talent-connect/data-access'
import { Caption } from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import { Content } from 'react-bulma-components'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadContactDetailsProfilePropFragment } from './ReadContactDetails.generated'

interface Props {
  profile: ReadContactDetailsProfilePropFragment
  shortInfo?: boolean
}

const ReadContactDetails = ({ profile, shortInfo }: Props) => {
  const { fullName, email, telephoneNumber } = profile

  return (
    <>
      {shortInfo && <Caption>Contact Details</Caption>}
      <Content>
        {email && <p>{email}</p>}
        {!shortInfo && fullName && <p>{fullName}</p>}
        {telephoneNumber && <p>{telephoneNumber}</p>}
      </Content>
    </>
  )
}

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <ReadContactDetails profile={myProfileQuery.data.conProfile} />
  },
  Some: ({ profile }: Props) => (
    <ReadContactDetails profile={profile} shortInfo />
  ),
}
