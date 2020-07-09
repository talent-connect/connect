import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

interface Props {
  profile: RedProfile
}

const Me = ({ profile }: Props) => {
  const {
    menteeCountCapacity
  } = profile

  return (
    <Content>
      {menteeCountCapacity && <p>{menteeCountCapacity}</p>}
    </Content>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile
})

export default {
  Me: connect(mapStateToProps, {})(Me)
}
