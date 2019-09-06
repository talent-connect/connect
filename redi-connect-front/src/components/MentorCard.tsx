import React from 'react';
import { RedProfile } from '../types/RedProfile';
import {
  Card,
  CardContent,
  createStyles,
  withStyles,
  Grid,
  Theme,
} from '@material-ui/core';
import { Language as LanguageIcon } from '@material-ui/icons';
import { Avatar } from './Avatar';
import { CategoryChip } from './CategoryChip';

type Props = {
  mentor: RedProfile;
  classes: {
    avatar: string;
    category: string;
  };
  onClick?: Function;
};

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      width: '100px',
      height: '100px',
    },
    category: {
      color: 'white',
      fontSize: '12px',
      margin: '3px',
      height: '20px',
    },
  });

export const MentorCard = withStyles(styles)(
  ({ mentor, classes, onClick }: Props) => {
    if (!mentor.categories) console.log(mentor);
    return (
      <Card onClick={() => typeof onClick === 'function' && onClick()}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item>
              <Avatar
                className={classes.avatar}
                s3Key={mentor.profileAvatarImageS3Key}
              />
            </Grid>
            <Grid item>
              <h3 style={{ fontWeight: 700, fontFamily: 'Roboto' }}>
                {mentor.firstName} {mentor.lastName}
              </h3>
              <h4 style={{ fontWeight: 400, fontFamily: 'Roboto' }}>
                {mentor.mentor_occupation}
              </h4>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            alignItems="center"
            style={{ margin: '5px 0' }}
          >
            <Grid item>
              <LanguageIcon />
            </Grid>
            <Grid item>{mentor.languages.join(', ')}</Grid>
          </Grid>
          {mentor.categories.map(catId => (
            <CategoryChip
              key={catId}
              className={classes.category}
              categoryId={catId}
            />
          ))}
        </CardContent>
      </Card>
    );
  }
);
