import React, { useEffect } from 'react';
import { LoggedInLayout } from '../../../layouts/LoggedInLayout';
import { RootState } from '../../../redux/types';
import { getApplicants, getMentees } from '../../../redux/matches/selectors';
import { connect } from 'react-redux';
import { matchesFetchStart } from '../../../redux/matches/actions';
import { FullScreenCircle } from '../../../hooks/WithLoading';
import { RedMatch } from '../../../types/RedMatch';
import { ApplicationCard } from './ApplicationCard';
import ClockwiseRotationIcon from '../../../assets/clockwise-rotation.png';
import {
  Grid,
  Paper,
  withStyles,
  Typography,
  Container,
} from '@material-ui/core';
import { MenteeCard } from './MenteeCard';
import { makeStyles } from '@material-ui/styles';

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

// const withData = (): {
//   applicants: any;
//   me: any;
// } => {
//   const me = fetchSaveRedProfile(getAccessToken());
//   const applicants = fetchApplicants();
//   return { me, applicants };
// };

interface Props {
  mentees: RedMatch[];
  applicants: RedMatch[];
}

const mapState = (state: RootState) => ({
  loading: state.matches.loading,
  mentees: getMentees(state.matches),
  applicants: getApplicants(state.matches)
});

const styles = (theme: any) => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: "2em"
  },
  header: {
    marginTop: 0,
  },
});

// TODO: add type to Props
export default withStyles(styles)(
  connect(mapState)((props: any) => {
    useEffect(() => {
      (props as any).dispatch(matchesFetchStart());
    }, []);

    const mentees: RedMatch[] = (props as any).mentees;
    const applicants: RedMatch[] = (props as any).applicants;

    return (
      <LoggedInLayout>
        <FullScreenCircle loading={(props as any).loading} />
        {mentees.length === 0 && applicants.length === 0 && (
          <NoApplicantsOrMentees />
        )}
        {mentees.length > 0 && (
          <Paper className={(props as any).classes.paper}>
            <h1 className={(props as any).classes.header}>Your mentees</h1>
            <Grid container spacing={1}>
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
            <Grid container spacing={1}>
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

const useStyles = makeStyles({
  topMargin: {
    marginTop: '4em',
  },
  clockIcon: {
    maxWidth: '7em',
    margin: '0 auto',
    textAlign: 'center',
    marginTop: '4em',
    marginBottom: '4em',
  },
  infoText: {
    color: '#8E8E8E',
  },
});

const NoApplicantsOrMentees = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" className={classes.topMargin}>
        Currently you have no applicants or mentees.
      </Typography>
      <Typography align="center">
        <img src={ClockwiseRotationIcon} className={classes.clockIcon} />
      </Typography>
      <Typography className={classes.infoText} align="center">
        We will send you email when students apply for the mentorship.
      </Typography>
    </Container>
  );
};
