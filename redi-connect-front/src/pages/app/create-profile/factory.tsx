import React, { useState } from 'react';
import { Formik, FormikValues, FormikHelpers as FormikActions } from 'formik';
import Grid from '@material-ui/core/Grid';
import omit from 'lodash/omit';

import {
  Step0DataConsent,
  validationSchema as step0Val,
} from './steps/Step0DataConsent';
import { Step1Intro, validationSchema as step1Val } from './steps/Step1Intro';
import {
  Step2Background,
  validationSchema as step2Val,
} from './steps/Step2Background';
import {
  Step3Profile,
  validationSchema as step3Val,
} from './steps/Step3Profile';
import {
  Button,
  Paper,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core';
import { SignUpFormStepper } from './SignUpFormStepper';
import {
  Step4ContactData,
  validationSchema as step4Val,
} from './steps/Step4ContactData';
import {
  Step5Categories,
  validationSchema as step5Val,
} from './steps/Step5Categories';
import { signUp } from '../../../services/api/api';
import { RedProfile } from '../../../types/RedProfile';
import { history } from '../../../services/history/history';

const styles = (theme: Theme) =>
  createStyles({
    submitError: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.error.main,
      color: 'white',
    },
  });

export type SignUpFormType =
  | 'mentor'
  | 'mentee'
  | 'public-sign-up-mentor-pending-review'
  | 'public-sign-up-mentee-pending-review';

export interface CreateProfileFormValues {
  formType: SignUpFormType;
  gaveGdprConsentAt: string;
  username: string;
  password: string;
  passwordConfirm: string;
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
  languages: string[];
  otherLanguages: string;
  personalDescription: string;
  contactEmail: string;
  linkedInProfileUrl: string;
  githubProfileUrl: string;
  slackUsername: string;
  telephoneNumber: string;
  categories: string[];
  menteeCountCapacity: number;
  agreesWithCodeOfConduct: boolean;
}

const initialValues: CreateProfileFormValues = {
  formType: 'mentee',
  gaveGdprConsentAt: '',
  username: '',
  password: '',
  passwordConfirm: '',
  mentor_occupation: '',
  mentor_workPlace: '',
  expectations: '',
  mentee_highestEducationLevel: '',
  mentee_currentlyEnrolledInCourse: '',
  mentee_occupationCategoryId: '',
  mentee_occupationJob_placeOfEmployment: '',
  mentee_occupationJob_position: '',
  mentee_occupationStudent_studyPlace: '',
  mentee_occupationStudent_studyName: '',
  mentee_occupationLookingForJob_what: '',
  mentee_occupationOther_description: '',
  profileAvatarImageS3Key: '',
  firstName: '',
  lastName: '',
  gender: '',
  age: undefined,
  languages: ['English'],
  otherLanguages: '',
  personalDescription: '',
  contactEmail: '',
  linkedInProfileUrl: '',
  githubProfileUrl: '',
  slackUsername: '',
  telephoneNumber: '',
  categories: [],
  menteeCountCapacity: 1,
  agreesWithCodeOfConduct: false,
};

const validationSchemas = [
  step0Val,
  step1Val,
  step2Val,
  step3Val,
  step4Val,
  step5Val,
];

export const buildSignUpForm = (
  type: SignUpFormType
): Function => (): React.ReactFragment => {
  const [submitError, setSubmitError] = useState(false);
  const [step, prev, next, setStep, validationSchema] = useStepper(0);

  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<CreateProfileFormValues>
  ) => {
    setSubmitError(false);
    const profile = values as RedProfile;
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
      history.push('/app/create-profile/complete/' + type);
    } catch (error) {
      setSubmitError(Boolean(error));
    }
    actions.setSubmitting(false);
  };

  // TODO: Ugly way of getting classes -- fix this
  const GetClasses = withStyles(styles)((props: any) =>
    props.children(props.classes)
  );

  initialValues.formType = type;

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        render={props => (
          <form onSubmit={e => e.preventDefault()}>
            <SignUpFormStepper
              activeStep={step}
              handleStepChange={x => setStep(x)}
              disabled={props.isSubmitting}
            />
            {submitError && (
              <GetClasses>
                {(classes: any) => (
                  <Paper className={classes.submitError}>
                    An error occurred, please try again.
                  </Paper>
                )}
              </GetClasses>
            )}
            {/* {step === 0 && <Step0DataConsent type={type} {...props} />}
            {step === 1 && <Step1Intro type={type} {...props} />} */}
            {step === 2 && <Step2Background type={type} {...props} />}
            {step === 3 && <Step3Profile type={type} {...props} />}
            {step === 4 && <Step4ContactData type={type} {...props} />}
            {step === 5 && <Step5Categories type={type} {...props} />}
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  onClick={() => {
                    prev();
                    setTimeout(() => props.validateForm());
                  }}
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={step === 0 || props.isSubmitting}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => {
                    if (step === 5) {
                      props.handleSubmit();
                    } else {
                      next();
                      setTimeout(() => props.validateForm());
                    }
                  }}
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={!props.isValid || props.isSubmitting}
                  type="submit"
                >
                  {step < 5 && <>Next</>}
                  {step === 5 && <>Complete</>}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </>
  );
};

function useStepper(
  initialStep = 0
): [number, Function, Function, Function, Record<string, any>] {
  const [step, setStep] = useState(initialStep);

  const prev = () => setStep(page => page - 1);
  const next = () => setStep(page => page + 1);

  const schema = validationSchemas[step];

  return [step, prev, next, setStep, schema];
}
