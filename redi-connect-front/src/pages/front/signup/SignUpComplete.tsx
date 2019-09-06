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
      <p>
        Thanks for registering! We're thrilled that you're ReDI :) We promise to
        review your profile as quickly as possible. We'll send you an email once
        we're done.
      </p>
    </LoggedOutLayout>
  );
};
