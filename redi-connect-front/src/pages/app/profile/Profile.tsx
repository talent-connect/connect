import { Button, Theme, createStyles, withStyles } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withLoading, FullScreenCircle } from '../../../hooks/WithLoading';
import { LoggedInLayout } from '../../../layouts/LoggedInLayout';
import { getProfile } from '../../../services/api/api';
import { RedProfile } from '../../../types/RedProfile';
import { ProfileMentee } from './mentee/ProfileMentee';
import { ProfileMentor } from './mentor/ProfileMentor';
import { history } from '../../../services/history/history';
import { connect } from 'react-redux';
import { profilesFetchOneStart } from '../../../redux/profiles/actions';
import { RootState } from '../../../redux/types';
import { ProfileAcceptedMatch } from './acceptedMatch/ProfileAcceptedMatch';

interface RouteParams {
  profileId: string;
}

const styles = (theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
    },
  });

export const Profile: FunctionComponent<RouteComponentProps<RouteParams>> = ({
  match: {
    params: { profileId },
  },
}) => {
  return (
    <ProfileLoader profileId={profileId}>
      {({ loading, profile, currentUser }: any) => (
        <>
          <FullScreenCircle loading={loading} />
          <Presentation profile={profile} currentUser={currentUser} />
        </>
      )}
    </ProfileLoader>
  );
};

const ProfileLoader = connect((state: RootState) => ({
  loading: state.profiles.loading,
  profile: state.profiles.oneProfile,
  currentUser: state.user.profile,
}))((props: any) => {
  useEffect(() => {
    props.dispatch(profilesFetchOneStart(props.profileId));
  }, []);
  return props.children({
    loading: props.loading,
    profile: props.profile,
    currentUser: props.currentUser,
  });
});

type PresentationProps = {
  classes: {
    button: string;
  };
  profile: RedProfile | undefined;
  currentUser: RedProfile | undefined;
};

const Presentation = withStyles(styles)(
  ({ classes, profile, currentUser }: PresentationProps) => {
    const isAcceptedMatch =
      profile &&
      profile.redMatchesWithCurrentUser &&
      profile.redMatchesWithCurrentUser[0] &&
      profile.redMatchesWithCurrentUser[0].status === 'accepted';
    const currentUserIsMentor =
      currentUser && currentUser.userType === 'mentor';
    const LinkToDashboard: any = (props: any) => (
      <Link {...props} to="/app/dashboard" />
    );
    return (
      <LoggedInLayout>
        {(!isAcceptedMatch || currentUserIsMentor) && (
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            component={LinkToDashboard}
          >
            Back
          </Button>
        )}
        {isAcceptedMatch && profile && (
          <ProfileAcceptedMatch profile={profile} />
        )}
        {!isAcceptedMatch &&
          typeof profile !== 'undefined' &&
          profile.userType === 'mentee' && <ProfileMentee mentee={profile} />}
        {!isAcceptedMatch &&
          typeof profile !== 'undefined' &&
          profile.userType === 'mentor' && <ProfileMentor mentor={profile} />}
      </LoggedInLayout>
    );
  }
);
