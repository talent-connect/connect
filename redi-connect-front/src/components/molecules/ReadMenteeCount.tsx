import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { rediLocationNames } from '../../config/config'

interface Props {
  profile: RedProfile
}

const Me = ({ profile }: Props) => {
  const {
    menteeCountCapacity,
    optOutOfMenteesFromOtherRediLocation,
    rediLocation,
  } = profile

  return (
    <Content>
      {menteeCountCapacity && <p>{menteeCountCapacity}</p>}
      {!optOutOfMenteesFromOtherRediLocation && <p>Let mentees in my location ({rediLocationNames[rediLocation]}) AND other locations apply for mentorship</p>}
      {optOutOfMenteesFromOtherRediLocation && <p>Only let mentees from my own location ({rediLocationNames[rediLocation]}) apply for mentorship</p>}
    </Content>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile
})

export default {
  Me: connect(mapStateToProps, {})(Me)
}
