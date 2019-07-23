import React, { useEffect } from 'react';
import { LoggedInLayout } from '../../../layouts/LoggedInLayout';
import { RedProfile } from '../../../types/RedProfile';
import {
  fetchSaveRedProfile,
  fetchApplicants,
} from '../../../services/api/api';
import { getAccessToken } from '../../../services/auth/auth';
import { RootState } from '../../../redux/types';
import { getApplicants, getMentees } from '../../../redux/matches/selectors';
import { connect } from 'react-redux';
import { matchesFetchStart } from '../../../redux/matches/actions';
import { FullScreenCircle } from '../../../hooks/WithLoading';
import { RedMatch } from '../../../types/RedMatch';
import { ApplicationCard } from './ApplicationCard';
import { Grid, Paper, withStyles } from '@material-ui/core';
import { MenteeCard } from './MenteeCard';

/*
const withData = (): {
  applicants: Array<RedProfile>;
  me: RedProfile;
} => {
  const me = fetchSaveRedProfile(getAccessToken());
  const applicants = fetchApplicants();
  return { me, applicants };
};
*/

const withData = (): {
  applicants: any;
  me: any;
} => {
  const me = fetchSaveRedProfile(getAccessToken());
  const applicants = fetchApplicants();
  return { me, applicants };
};

type Props = {
  mentees: Array<RedMatch>;
  applicants: Array<RedMatch>;
};

const mapState = (state: RootState) => ({
  loading: state.matches.loading,
  mentees: getMentees(state.matches),
  applicants: getApplicants(state.matches),
});

const styles = (theme: any) => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: '2em',
  },
  header: {
    marginTop: 0,
  }
});

// TODO: add type to Props
export const Applications = withStyles(styles)(
  connect(mapState)((props: any) => {
    useEffect(() => {
      (props as any).dispatch(matchesFetchStart());
    }, []);

    const mentees: Array<RedMatch> = (props as any).mentees;
    const applicants: Array<RedMatch> = (props as any).applicants;

    return (
      <LoggedInLayout>
        <button onClick={()=>{ throw new TypeError("its a joke")}}>Break the world</button>
        <FullScreenCircle loading={(props as any).loading} />
        {mentees.length === 0 && applicants.length === 0 && (
          <h4>You currently have no applicants or mentees.</h4>
        )}
        {mentees.length > 0 && (
          <Paper className={(props as any).classes.paper}>
            <h1 className={(props as any).classes.header}>Your mentees</h1>
            <Grid container spacing={8}>
              {mentees.map(
                (mentee: RedMatch) =>
                  mentee.mentee && (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={2}
                      key={mentee.id}
                    >
                      <MenteeCard mentee={mentee.mentee} />
                    </Grid>
                  )
              )}
            </Grid>
          </Paper>
        )}
        {applicants.length > 0 && (
          <Paper className={(props as any).classes.paper}>
            <h1 className={(props as any).classes.header}>Application list</h1>
            <Grid container spacing={8}>
              {applicants.map((application: RedMatch) => (
                <Grid item xs={12} key={application.id}>
                  <ApplicationCard application={application} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </LoggedInLayout>
    );
  })
);
