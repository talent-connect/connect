import { Grid, createStyles, withStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { intersection } from 'lodash';
import { MentorCard } from '../../../../components/MentorCard';
import { useLoading } from '../../../../hooks/WithLoading';
import { getMentors } from '../../../../services/api/api';
import { history } from '../../../../services/history/history';
import { RedProfile } from '../../../../types/RedProfile';
import { getRedProfile } from '../../../../services/auth/auth';
import { CategoryChip } from '../../../../components/CategoryChip';
import { useList } from '../../../../hooks/useList';

const styles = createStyles((theme: any) => ({
  categoryChip: {
    marginTop: '0.5em',
    marginRight: '1em',
    color: 'white',
    fontSize: '12px',
    float: 'left',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: '2em',
  },
  header: {
    marginTop: 0,
  },
}));

type Props = {
  classes: {
    categoryChip: string;
    paper: string;
    header: string;
  };
};

type MentorCatCount = RedProfile & { categoryMatchCount: number };

const addCategoryMatchCount = (
  mentors: Array<RedProfile>,
  categories: Array<string>
): Array<MentorCatCount> =>
  mentors.map(mentor =>
    Object.assign(mentor, {
      categoryMatchCount: intersection(categories, mentor.categories).length,
    })
  );

export const AvailableMentorListing: React.FunctionComponent = withStyles(styles)((props: any) => {
  const classes: any = props.classes;
  const { Loading, setLoading } = useLoading();
  const [_mentors, setMentors] = useState<Array<RedProfile>>([]);
  const currentUserCategories = getRedProfile().categories;
  const [activeCategories, { toggle }] = useList(currentUserCategories);

  const mentorsFiltered = _mentors.filter(
    m => m.currentFreeMenteeSpots > 0 && m.userActivated
  );

  const mentorsWhoHaveSpotsButAreNotActivatedCount = _mentors.filter(
    m => m.userActivated === false && m.currentFreeMenteeSpots > 0
  ).length;

  const mentors = addCategoryMatchCount(mentorsFiltered, activeCategories);

  const mentorsWithSharedCategories = mentors
    .filter(m => m.categoryMatchCount > 0)
    .sort((a, b) => a.categoryMatchCount - b.categoryMatchCount);
  const mentorsWithoutSharedCategories = mentors.filter(
    m => m.categoryMatchCount === 0
  );

  useEffect(() => {
    setLoading(true);
    getMentors().then(mentors => {
      setMentors(mentors);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Loading />
      {mentors.length === 0 &&
        mentorsWhoHaveSpotsButAreNotActivatedCount > 0 && (
          <h4>
            We have {mentorsWhoHaveSpotsButAreNotActivatedCount} available
            mentors. Unfortunately, they have not activated their profiles yet.
            Please check in again later.
          </h4>
        )}
      {mentorsWhoHaveSpotsButAreNotActivatedCount === 0 &&
        mentors.length === 0 && (
          <h4>
            Unfortunately there are no available mentors right now. We are
            constantly recruiting new mentors, so please check back in later.
          </h4>
        )}
      {mentorsWithSharedCategories.length > 0 && (
        <Paper className={(props as any).classes.paper}>
          <Grid container direction="column">
            <Grid item>
              <h1 className={(props as any).classes.header}>
                Recommended mentors
              </h1>
            </Grid>
            <Grid item>
              {currentUserCategories.map(catId => (
                <CategoryChip
                  key={catId}
                  categoryId={catId}
                  className={classes.categoryChip}
                  overrideBackgroundColour={
                    !activeCategories.includes(catId) ? '#b2b2b2' : ''
                  }
                  onClick={() => toggle(catId)}
                />
              ))}
            </Grid>
            <Grid item style={{ margin: '10px 0', fontWeight: 300 }}>
              These mentors have expertise in one or more of the domains you
              selected of interest in your profile.
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            {mentorsWithSharedCategories.map((mentor: RedProfile) => (
              <Grid item xs={12} sm={6} lg={4} xl={2} key={mentor.id}>
                <MentorCard
                  mentor={mentor}
                  onClick={() => history.push(`/app/profile/${mentor.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
      {mentorsWithoutSharedCategories.length > 0 && (
        <Paper className={(props as any).classes.paper}>
          <h1 className={(props as any).classes.header}>
            All available mentors
          </h1>
          <Grid container spacing={16}>
            {mentorsWithoutSharedCategories.map((mentor: RedProfile) => (
              <Grid item xs={12} sm={6} lg={4} xl={2} key={mentor.id}>
                <MentorCard
                  mentor={mentor}
                  onClick={() => history.push(`/app/profile/${mentor.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </>
  );
});
