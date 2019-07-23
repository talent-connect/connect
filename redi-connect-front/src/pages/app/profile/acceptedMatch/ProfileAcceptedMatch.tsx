import { createStyles, Grid, Theme, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Avatar } from '../../../../components/Avatar';
import { CategoryChip } from '../../../../components/CategoryChip';
import { ContactInfo } from '../../../../components/ContactInfo';
import { LogMentoringSessionBtn } from '../../../../components/LogMentoringSessionBtn';
import { MentoringSessionsLog } from '../../../../components/MentoringSessionsLog';
import { ProfileCourse } from '../../../../components/ProfileCourse';
import { ProfileLanguages } from '../../../../components/ProfileLanguages';
import { ProfileName } from '../../../../components/ProfileName';
import { ProfileOccupation } from '../../../../components/ProfileOccupation';
import { ProfileWorkPlace } from '../../../../components/ProfileWorkPlace';
import { ReportProblemBtn } from '../../../../components/ReportProblemBtn';
import { RootState } from '../../../../redux/types';
import { RedProfile } from '../../../../types/RedProfile';

type Props = {
  profile: RedProfile;
  classes: {
    avatar: string;
    category: string;
    personalDescription: string;
  };
  currentUser: RedProfile;
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
    personalDescription: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      overflowWrap: 'break-word',
    },
  });

const mapState = (state: RootState) => ({
  currentUser: state.user.profile,
});

// TODO: ': any' to be replaced with proper type
export const ProfileAcceptedMatch = connect(mapState)(
  withStyles(styles)(({ profile, classes, currentUser }: any) => {
    const match =
      profile.redMatchesWithCurrentUser && profile.redMatchesWithCurrentUser[0];
    const occupation = occupationFormatter(profile);
    const workPlace = workPlaceFormatter(profile);
    const currentUserIsMentor = currentUser.userType === 'mentor';
    const currentUserIsMentee = currentUser.userType === 'mentee';

    return (
      <>
        {currentUserIsMentee && <h1>Information about your mentor</h1>}
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={16}>
              <Grid item xs={12} sm={5}>
                <Avatar
                  className={classes.avatar}
                  s3Key={profile.profileAvatarImageS3Key}
                  style={{ width: '100%', height: '20vh' }}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <h3
                  style={{ fontWeight: 700, fontFamily: 'Roboto', margin: 0 }}
                >
                  <ProfileName
                    name={`${profile.firstName} ${profile.lastName}`}
                  />
                </h3>
                <ProfileCourse
                  courseId={profile.mentee_currentlyEnrolledInCourse}
                />
                {occupation && <ProfileOccupation occupation={occupation} />}
                {workPlace && <ProfileWorkPlace workPlace={workPlace} />}
                <ProfileLanguages languages={profile.languages} />
              </Grid>
            </Grid>

            <p className={classes.personalDescription}>
              {profile.personalDescription}
            </p>
            {profile.expectations && <>
              <h4 style={{ marginBottom: 0 }}>
                {currentUserIsMentee && <>Expectations to my mentee:</>}
                {currentUserIsMentor && <>Expectations to my mentor:</>}
              </h4>
              <p className={classes.personalDescription} style={{ marginTop: '0.3em' }}>
                {profile.expectations}
              </p>
            </>}

            <ContactInfo profile={profile} />

            {currentUserIsMentor && <p>I want help with:</p>}
            {currentUserIsMentee && <p>I can help you with</p>}
            {profile.categories.map((catId: string) => (
              <CategoryChip
                key={catId}
                className={classes.category}
                categoryId={catId}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            {currentUserIsMentor && (
              <LogMentoringSessionBtn menteeId={profile.id} />
            )}
            <MentoringSessionsLog
              mentoringSessions={profile.redMentoringSessionsWithCurrentUser}
            />
          </Grid>
          <Grid item xs={12}>
            <div style={{ marginTop: '50px' }}>
              <ReportProblemBtn type="mentee" redProfileId={profile.id} />
            </div>
          </Grid>
        </Grid>
      </>
    );
  })
);

const occupationFormatter = (mentee: RedProfile) => {
  switch (mentee.mentee_occupationCategoryId) {
    case 'job':
      return (
        `Job` +
        (mentee.mentee_occupationJob_position
          ? ` (${mentee.mentee_occupationJob_position})`
          : '')
      );
    case 'student':
      return (
        `Student` +
        (mentee.mentee_occupationStudent_studyName
          ? ` (${mentee.mentee_occupationStudent_studyName})`
          : '')
      );
    case 'lookingForJob':
      return (
        `Looking for a job` +
        (mentee.mentee_occupationLookingForJob_what
          ? ` ${mentee.mentee_occupationLookingForJob_what})`
          : '')
      );
    case 'other':
      return mentee.mentee_occupationOther_description;
    default:
      return undefined;
  }
};

const workPlaceFormatter = (mentee: RedProfile) => {
  switch (mentee.mentee_occupationCategoryId) {
    case 'job':
      return mentee.mentee_occupationJob_placeOfEmployment;
    case 'student':
      return mentee.mentee_occupationStudent_studyPlace;
    case 'lookingForJob':
    case 'other':
    default:
      return undefined;
  }
};
