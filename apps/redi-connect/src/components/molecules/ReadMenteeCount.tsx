import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { ConProfile, useLoadMyProfileQuery } from '@talent-connect/data-access'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'

interface Props {
  profile: Pick<
    ConProfile,
    | 'menteeCountCapacity'
    | 'optOutOfMenteesFromOtherRediLocation'
    | 'rediLocation'
  >
}

function Me({ profile }: Props) {
  const {
    menteeCountCapacity,
    optOutOfMenteesFromOtherRediLocation,
    rediLocation,
  } = profile

  return (
    <Content>
      {menteeCountCapacity && <p>{menteeCountCapacity}</p>}
      {!optOutOfMenteesFromOtherRediLocation && (
        <p>
          Let mentees in my location ({REDI_LOCATION_NAMES[rediLocation]}) AND
          other locations apply for mentorship
        </p>
      )}
      {optOutOfMenteesFromOtherRediLocation && (
        <p>
          Only let mentees from my own location (
          {REDI_LOCATION_NAMES[rediLocation]}) apply for mentorship
        </p>
      )}
    </Content>
  )
}

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <Me profile={myProfileQuery.data.conProfile} />
  },
}
