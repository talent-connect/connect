import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { RootState } from '../../../../redux/types';
import { AvailableMentorListing } from './AvailableMentorListing';
import { LoggedInLayout } from '../../../../layouts/LoggedInLayout';

const mapState = (state: RootState) => ({
  currentMenteeUserHasActiveMentor:
    state.user.profile && state.user.profile.ifUserIsMentee_hasActiveMentor,
  activeMentor:
    state.user.profile && state.user.profile.ifUserIsMentee_activeMentor,
});

export const DashboardMentee = connect(mapState)((props: any) => (
  <LoggedInLayout>
    {!props.currentMenteeUserHasActiveMentor && <AvailableMentorListing />}
    {props.currentMenteeUserHasActiveMentor && (
      <Redirect to={`/app/profile/${props.activeMentor.id}`} />
    )}
  </LoggedInLayout>
));
