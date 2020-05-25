import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { RootState } from '../../../../redux/types'
import { AvailableMentorListing } from './AvailableMentorListing'
import LoggedIn from '../../../../components/templates/LoggedIn'

const mapState = (state: RootState) => ({
  currentMenteeUserHasActiveMentor:
    state.user.profile && state.user.profile.ifUserIsMentee_hasActiveMentor,
  activeMentor:
    state.user.profile && state.user.profile.ifUserIsMentee_activeMentor
})

export const DashboardMentee = connect(mapState)((props: any) => (
  <LoggedIn>
    {!props.currentMenteeUserHasActiveMentor && <AvailableMentorListing />}
    {props.currentMenteeUserHasActiveMentor && (
      <Redirect to={`/app/profile/${props.activeMentor.id}`} />
    )}
  </LoggedIn>
))
