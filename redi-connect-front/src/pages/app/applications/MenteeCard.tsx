import {
  Card,
  CardContent,
  createStyles,
  Grid,
  Theme,
  withStyles,
} from '@material-ui/core';
import { Language as LanguageIcon } from '@material-ui/icons';
import React from 'react';
import { Avatar } from '../../../components/Avatar';
import { LogMentoringSessionBtn } from '../../../components/LogMentoringSessionBtn';
import { courseIdToLabelMap } from '../../../config/config';
import { RedProfile } from '../../../types/RedProfile';
import { history } from '../../../services/history/history';

type Props = {
  mentee: RedProfile;
  classes: {
    avatar: string;
    logMentoringSessionBtnContainer: string;
  };
};

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      width: '100px',
      height: '100px',
    },
    logMentoringSessionBtnContainer: {
      justifyContent: 'center',
    },
  });

export const MenteeCard = withStyles(styles)(({ mentee, classes }: Props) => {
  if (!mentee) return null;
  return (
    <Card onClick={() => history.push(`/app/profile/${mentee.id}`)}>
      <CardContent>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Grid container spacing={8}>
              <Grid item>
                <Avatar
                  className={classes.avatar}
                  s3Key={mentee.profileAvatarImageS3Key}
                />
              </Grid>
              <Grid item>
                <h3 style={{ fontWeight: 700, fontFamily: 'Roboto' }}>
                  {mentee.firstName} {mentee.lastName}
                </h3>
                <h4 style={{ fontWeight: 400, fontFamily: 'Roboto' }}>
                  Course:{' '}
                  {courseIdToLabelMap[mentee.mentee_currentlyEnrolledInCourse]}
                </h4>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={8}
              alignItems="center"
              style={{ margin: '5px 0' }}
            >
              <Grid item>
                <LanguageIcon />
              </Grid>
              <Grid item>{mentee.languages.join(', ')}</Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              alignItems="center"
              className={classes.logMentoringSessionBtnContainer}
              style={{ height: '100%' }}
            >
              <LogMentoringSessionBtn menteeId={mentee.id} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});
