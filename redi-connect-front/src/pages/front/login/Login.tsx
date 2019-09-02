import React, { useState } from 'react';
import { LoggedOutLayout } from '../../../layouts/LoggedOutLayout';
import * as Yup from 'yup';
import {
  TextField,
  InputAdornment,
  Button,
  Paper,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core';
import { Lock as LockIcon, Person as PersonIcon } from '@material-ui/icons';
import { Formik, FormikProps, FormikActions, FormikValues } from 'formik';
import { history } from '../../../services/history/history';
import { login, fetchSaveRedProfile } from '../../../services/api/api';
import { saveAccessToken } from '../../../services/auth/auth';

const styles = (theme: Theme) =>
  createStyles({
    loginError: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.error.main,
      color: 'white',
    },
  });

interface LoginFormValues {
  username: string;
  password: string;
}

const initialValues: LoginFormValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string()
    .email()
    .required()
    .label('Email')
    .max(255),
  password: Yup.string()
    .required()
    .label('Password')
    .max(255),
});

export const Login = () => {
  const [loginError, setLoginError] = useState<string>('');

  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<LoginFormValues>
  ) => {
    const formValues = values as LoginFormValues;
    try {
      const accessToken = await login(formValues.username, formValues.password);
      saveAccessToken(accessToken);
      await fetchSaveRedProfile(accessToken);
      history.push('/app/dashboard');
    } catch (err) {
      setLoginError('Invalid username or password');
    }
    actions.setSubmitting(false);
  };

  return (
    <LoggedOutLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        render={props => <Form {...props} loginError={loginError} />}
      />
    </LoggedOutLayout>
  );
};

const Form = withStyles(styles)(
  (
    props: FormikProps<LoginFormValues> & {
      loginError: string;
      classes: { loginError: string };
    }
  ) => {
    const {
      classes,
      loginError,
      values: { username, password },
      errors,
      touched,
      handleChange,
      isValid,
      isSubmitting,
      setFieldTouched,
      submitForm,
    } = props;

    const change = (name: any, e: any) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };

    return (
      <>
        <h3>Log in to ReDI Connect</h3>
        {loginError && (
          <Paper className={classes.loginError}>{loginError}</Paper>
        )}
        <form onSubmit={e => e.preventDefault()}>
          <TextField
            id="username"
            name="username"
            type="email"
            helperText={touched.username ? errors.username : ''}
            error={touched.username && Boolean(errors.username)}
            label="Username (your email address)*"
            value={username}
            onChange={change.bind(null, 'username')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            margin="normal"
            disabled={isSubmitting}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            label="Password*"
            value={password}
            onChange={change.bind(null, 'password')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            margin="normal"
            disabled={isSubmitting}
          />
          <Button
            onClick={submitForm}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={isSubmitting || !isValid}
          >
            Log in
          </Button>
        </form>
      </>
    );
  }
);
