import React, { useState } from 'react';
import * as Yup from 'yup';

import { Formik, FormikValues, FormikHelpers as FormikActions } from 'formik';
import Grid from '@material-ui/core/Grid';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import omit from 'lodash/omit';

import { Button, FormControlLabel, Checkbox } from '@material-ui/core';

import { signUp } from '../../../services/api/api';
import { RedProfile } from '../../../types/RedProfile';
import { history } from '../../../services/history/history';

import { courses } from '../../../config/config';

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .required()
    .max(255),
  lastName: Yup.string()
    .required()
    .max(255),
  username: Yup.string()
    .email()
    .label('Email')
    .max(255),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
    .label('Password'),
  passwordConfirm: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
  agreesWithCodeOfConduct: Yup.boolean()
    .required()
    .oneOf([true]),
  gaveGdprConsentAt: Yup.string()
    .required()
    .label('Data usage consent'),
  mentee_currentlyEnrolledInCourse: Yup.string().when('formType', {
    is: 'public-sign-up-mentee-pending-review',
    then: Yup.string()
      .oneOf(courses.map(level => level.id))
      .label('Currently enrolled in course'),
  }),
});

export type SignUpFormType =
  | 'public-sign-up-mentor-pending-review'
  | 'public-sign-up-mentee-pending-review';

export interface SignUpFormValues {
  formType: SignUpFormType;
  gaveGdprConsentAt: string;
  username: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  agreesWithCodeOfConduct: boolean;
  mentee_currentlyEnrolledInCourse: string;
}

const initialValues: SignUpFormValues = {
  formType: 'public-sign-up-mentee-pending-review',
  gaveGdprConsentAt: '',
  username: '',
  password: '',
  passwordConfirm: '',
  firstName: '',
  lastName: '',
  agreesWithCodeOfConduct: false,
  mentee_currentlyEnrolledInCourse: '',
};

export const buildSignUpForm = (
  type: SignUpFormType
): Function => (): React.ReactFragment => {
  const [submitError, setSubmitError] = useState(false);
  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<SignUpFormValues>
  ) => {
    setSubmitError(false);
    const profile = values as Partial<RedProfile>;
    // TODO: this needs to be done in a smarter way, like iterating over the RedProfile definition or something
    const cleanProfile: Partial<RedProfile> = omit(profile, [
      'password',
      'passwordConfirm',
      'formType',
      'agreesWithCodeOfConduct',
    ]);
    cleanProfile.userType = type;
    cleanProfile.userActivated = false;
    cleanProfile.signupSource = 'public-sign-up';
    try {
      await signUp(values.username, values.password, cleanProfile);
      history.push('/front/signup/complete/' + type);
    } catch (error) {
      setSubmitError(Boolean(error));
    }
    actions.setSubmitting(false);
  };

  initialValues.formType = type;

  const change = (
    name: any,
    handleChange: any,
    setFieldTouched: any,
    e: any
  ) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        render={props => (
          <form onSubmit={e => e.preventDefault()}>
            {submitError && <h1>An error occurred, please try again.</h1>}
            <p>Your account requires a password to set up your profile:</p>
            <TextField
              id="firstName"
              name="firstName"
              helperText={props.touched.firstName ? props.errors.firstName : ''}
              error={props.touched.firstName && Boolean(props.errors.firstName)}
              label="First name*"
              value={props.values.firstName}
              onChange={change.bind(
                null,
                'firstName',
                props.handleChange,
                props.setFieldTouched
              )}
              fullWidth
              margin="normal"
            />
            <TextField
              id="lastName"
              name="lastName"
              helperText={props.touched.lastName ? props.errors.lastName : ''}
              error={props.touched.lastName && Boolean(props.errors.lastName)}
              label="Last name*"
              value={props.values.lastName}
              onChange={change.bind(
                null,
                'lastName',
                props.handleChange,
                props.setFieldTouched
              )}
              fullWidth
              margin="normal"
            />
            <TextField
              id="username"
              name="username"
              type="email"
              helperText={props.touched.username ? props.errors.username : ''}
              error={props.touched.username && Boolean(props.errors.username)}
              label="Username (your email address)*"
              value={props.values.username}
              onChange={change.bind(
                null,
                'username',
                props.handleChange,
                props.setFieldTouched
              )}
              fullWidth
              margin="normal"
            />
            <TextField
              id="password"
              name="password"
              type="password"
              helperText={props.touched.password ? props.errors.password : ''}
              error={props.touched.password && Boolean(props.errors.password)}
              label="Password*"
              value={props.values.password}
              onChange={change.bind(
                null,
                'password',
                props.handleChange,
                props.setFieldTouched
              )}
              fullWidth
              margin="normal"
            />
            <TextField
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              helperText={
                props.touched.passwordConfirm
                  ? props.errors.passwordConfirm
                  : ''
              }
              error={
                props.touched.passwordConfirm &&
                Boolean(props.errors.passwordConfirm)
              }
              label="Repeat password*"
              value={props.values.passwordConfirm}
              onChange={change.bind(
                null,
                'passwordConfirm',
                props.handleChange,
                props.setFieldTouched
              )}
              fullWidth
              margin="normal"
            />
            {type === 'public-sign-up-mentee-pending-review' && (
              <FormControl fullWidth>
                <InputLabel htmlFor="mentee_currentlyEnrolledInCourse">
                  Which course are you taking at ReDI?*
                </InputLabel>
                <Select
                  value={props.values.mentee_currentlyEnrolledInCourse}
                  error={
                    props.touched.mentee_currentlyEnrolledInCourse &&
                    Boolean(props.errors.mentee_currentlyEnrolledInCourse)
                  }
                  onChange={change.bind(
                    null,
                    'mentee_currentlyEnrolledInCourse',
                    props.handleChange,
                    props.setFieldTouched
                  )}
                  inputProps={{
                    name: 'mentee_currentlyEnrolledInCourse',
                    id: 'mentee_currentlyEnrolledInCourse',
                  }}
                >
                  {courses.map(course => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControlLabel
              label={
                <label htmlFor="agreesWithCodeOfConduct">
                  I agree to follow the{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://connect.redi-school.org/downloadeables/redi-connect-code-of-conduct.pdf"
                  >
                    ReDI Connect Code of Conduct
                  </a>
                </label>
              }
              control={
                <Checkbox
                  id="agreesWithCodeOfConduct"
                  name="agreesWithCodeOfConduct"
                  checked={props.values.agreesWithCodeOfConduct}
                  value={true}
                  onChange={change.bind(
                    null,
                    'agreesWithCodeOfConduct',
                    props.handleChange,
                    props.setFieldTouched
                  )}
                  disabled={props.isSubmitting}
                />
              }
            />{' '}
            <br />
            <FormControlLabel
              label="I understand how my data will be used and consent to it"
              control={
                <Checkbox
                  id="gaveGdprConsentAt"
                  name="gaveGdprConsentAt"
                  value={new Date().toString()}
                  onChange={change.bind(
                    null,
                    'gaveGdprConsentAt',
                    props.handleChange,
                    props.setFieldTouched
                  )}
                />
              }
            />
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  onClick={() => props.handleSubmit()}
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={!props.isValid || props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </>
  );
};
