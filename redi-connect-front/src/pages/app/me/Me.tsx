import React, { useState, useEffect } from 'react';
import { Formik, FormikValues, FormikActions } from 'formik';
import Grid from '@material-ui/core/Grid';
import { omit } from 'lodash';
import * as Yup from 'yup';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

import { Step2Background } from './steps/Step2Background';
import { Step3Profile } from './steps/Step3Profile';
import {
  Button,
  Paper,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core';
import { Step4ContactData } from './steps/Step4ContactData';
import { Step5Categories } from './steps/Step5Categories';
import { http } from '../../../services/http/http';
import { signUp } from '../../../services/api/api';
import { RedProfile } from '../../../types/RedProfile';
import { history } from '../../../services/history/history';
import { getRedProfile } from '../../../services/auth/auth';
import { FullScreenCircle } from '../../../hooks/WithLoading';
import { LoggedInLayout } from '../../../layouts/LoggedInLayout';
import { RootState } from '../../../redux/types';
import { connect } from 'react-redux';
import {
  profileFetchStart,
  profileSaveStart,
} from '../../../redux/user/actions';
import {
  educationLevels,
  courses,
  menteeOccupationCategories,
} from '../../../config/config';

const styles = (theme: Theme) =>
  createStyles({
    submitError: {
      padding: theme.spacing.unit,
      backgroundColor: theme.palette.error.main,
      color: 'white',
    },
  });

export type SignUpFormType = 'mentor' | 'mentee' | 'public-sign-up-mentor-pending-review' | 'public-sign-up-mentee-pending-review' | 'public-sign-up-mentor-rejected' | 'public-sign-up-mentee-rejected';

export interface SignUpFormValues {
  formType: SignUpFormType;
  mentor_occupation: string;
  mentor_workPlace: string;
  expectations: string;
  mentee_occupationCategoryId: string; // TODO: do TS magic to make this a union type
  mentee_occupationJob_placeOfEmployment: string;
  mentee_occupationJob_position: string;
  mentee_occupationStudent_studyPlace: string;
  mentee_occupationStudent_studyName: string;
  mentee_occupationLookingForJob_what: string;
  mentee_occupationOther_description: string;
  mentee_highestEducationLevel: string;
  mentee_currentlyEnrolledInCourse: string;
  profileAvatarImageS3Key: string;
  firstName: string;
  lastName: string;
  gender: string;
  age?: number;
  languages: Array<String>;
  otherLanguages: string;
  personalDescription: string;
  contactEmail: string;
  linkedInProfileUrl: string;
  slackUsername: string;
  telephoneNumber: string;
  categories: Array<string>;
  menteeCountCapacity: number;
}

const validationSchema = Yup.object({
  mentor_occupation: Yup.string().when('formType', {
    is: 'mentor',
    then: Yup.string()
      .required()
      .max(255)
      .label('Occupation'),
  }),
  mentor_workPlace: Yup.string()
    .max(255)
    .label('Work place'),
  mentee_occupationCategoryId: Yup.string().when('formType', {
    is: 'mentee',
    then: Yup.string()
      .required()
      .oneOf(menteeOccupationCategories.map(v => v.id))
      .label('Current occupation'),
  }),
  mentee_occupationJob_placeOfEmployment: Yup.string()
    .max(255)
    .label('Where are you employed'),
  mentee_occupationJob_position: Yup.string()
    .max(255)
    .label('At what university do you study'),
  mentee_occupationStudent_studyPlace: Yup.string()
    .max(255)
    .label('Where do you study'),
  mentee_occupationStudent_studyName: Yup.string()
    .max(255)
    .label('What do you study'),
  mentee_occupationLookingForJob_what: Yup.string()
    .max(255)
    .label('What kind of job'),
  mentee_occupationOther_description: Yup.string()
    .max(255)
    .label('What are you currently doing'),
  mentee_highestEducationLevel: Yup.string().when('formType', {
    is: 'mentee',
    then: Yup.string()
      .oneOf(educationLevels.map(level => level.id))
      .label('Highest Education Level'),
  }),
  mentee_currentlyEnrolledInCourse: Yup.string().when('formType', {
    is: 'mentee',
    then: Yup.string()
      .oneOf(courses.map(level => level.id))
      .label('Currently enrolled in course'),
  }),
  profileAvatarImageS3Key: Yup.string().max(255),
  firstName: Yup.string()
    .required()
    .max(255),
  lastName: Yup.string()
    .required()
    .max(255),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'])
    .label('Gender'),
  age: Yup.number()
    .min(16)
    .max(99)
    .label('Age'),
  languages: Yup.array()
    .min(1)
    .of(Yup.string().max(255))
    .label('Languages'),
  personalDescription: Yup.string()
    .required()
    .min(100)
    .max(600)
    .label('Personal description'),
  contactEmail: Yup.string()
    .email()
    .required()
    .max(255)
    .label('Contact email'),
  linkedInProfileUrl: Yup.string()
    .max(255)
    .url()
    .label('LinkedIn Profile'),
  slackUsername: Yup.string()
    .max(255)
    .label('Slack username'),
  telephoneNumber: Yup.string()
    .max(255)
    .label('Telephone number'),
  menteeCountCapacity: Yup.number().when('formType', {
    is: 'mentor',
    then: Yup.number()
      .required('Please specify the number of mentees you can take on')
      .min(1)
      .max(4),
  }),
});

const mapState = (state: RootState) => ({
  saveResult: state.user.saveResult,
});

export const buildSignUpForm = (
  profile: RedProfile,
  dispatch: any
): Function => (): React.ReactFragment => {
  const [submitError, setSubmitError] = useState(false);
  const type = profile.userType;

  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<SignUpFormValues>
  ) => {
    setSubmitError(false);
    const profile = values as RedProfile;
    // TODO: this needs to be done in a smarter way, like iterating over the RedProfile definition or something
    const cleanProfile: RedProfile = omit(profile, [
      'password',
      'passwordConfirm',
      'formType',
      'redMatchesWithCurrentUser',
      'redMentoringSessionsWithCurrentUser',
      'updatedAt',
      'userType',
      'redMatchesWithCurrentUser',
      'redMentoringSessionsWithCurrentUser',
      'matchCountWithCurrentUser',
      'currentApplicantCount',
      'currentFreeMenteeSpots',
      'currentMenteeCount',
      'ifTypeForm_additionalComments',
    ]);
    dispatch(profileSaveStart(profile));
  };

  // TODO: fix this TS uglyness
  const initialValues: SignUpFormValues = (profile as unknown) as SignUpFormValues;
  initialValues.formType = type;

  const styles = (theme: Theme) =>
    createStyles({
      submitResult: {
        padding: theme.spacing.unit,
        color: 'white',
      },
      submitError: {
        backgroundColor: theme.palette.error.main,
      },
      submitSuccess: {
        backgroundColor: theme.palette.primary.main,
      },
      margin: {
        margin: '6px 0',
      },
    });

  const LinkToDashboard: any = (props: any) => (
    <Link {...props} to="/app/dashboard" />
  );

  const InnerForm = withStyles(styles)(
    connect(mapState)((props: any) => (
      <>
        <FullScreenCircle loading={props.saveResult === 'submitting'} />
        <Button component={LinkToDashboard} variant="contained" color="primary">
          Back
        </Button>
        {props.saveResult === 'error' && (
          <Paper
            className={classNames(
              props.classes.submitError,
              props.classes.submitResult
            )}
          >
            An error occurred, please try again.
          </Paper>
        )}
        {props.saveResult === 'success' && <>Your profile was saved.</>}
        <form onSubmit={e => e.preventDefault()}>
          <h2>Update your profile</h2>
          <Step2Background type={type} {...props} />
          <Step3Profile type={type} {...props} />
          <Step4ContactData type={type} {...props} />
          <Step5Categories type={type} {...props} />
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  props.handleSubmit();
                }}
                color="primary"
                variant="contained"
                fullWidth
                disabled={props.saveResult === 'submitting'}
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    ))
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        render={props => <InnerForm {...props} />}
      />
    </>
  );
};

export const Me = () => {
  return (
    <ProfileLoader profileId={getRedProfile().id}>
      {({ loading, profile, currentUser }: any) => (
        <>
          <FullScreenCircle loading={loading} />
          {!loading && <Presentation profile={profile} />}
        </>
      )}
    </ProfileLoader>
  );
};

const ProfileLoader = connect((state: RootState) => ({
  loading: state.user.loading,
  profile: state.user.profile,
}))((props: any) => {
  useEffect(() => {
    props.dispatch(profileFetchStart());
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

const Presentation = connect()(
  ({ profile, dispatch }: { profile: RedProfile } & { dispatch: any }) => {
    const Form = buildSignUpForm(profile, dispatch);
    return (
      <LoggedInLayout>
        <Form />
      </LoggedInLayout>
    );
  }
);
