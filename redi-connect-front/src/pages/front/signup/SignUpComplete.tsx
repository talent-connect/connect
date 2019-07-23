import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FormikProps } from 'formik';
import { LoggedOutLayout } from '../../../layouts/LoggedOutLayout';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

interface RouteParams {
  type: string;
}

export const SignUpComplete: FunctionComponent<
  RouteComponentProps<RouteParams>
> = ({
  match: {
    params: { type },
  },
}) => {
  // TODO: Replace 'any' with whatever is TS-appropriate
  const Comp: any = (props: any) => <Link {...props} to="/app/dashboard" />;
  return (
    <LoggedOutLayout>
      {type === 'mentor' && (
        <p>
          Great! The registration was successfully completed. Now you can view
          your profile. Mentees will apply according to your profile.
        </p>
      )}

      <Button color="primary" fullWidth variant="contained" component={Comp}>
        Go to profile
      </Button>
    </LoggedOutLayout>
  );
};
