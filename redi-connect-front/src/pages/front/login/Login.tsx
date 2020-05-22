import React, { useState } from 'react';
import { LoggedOutLayout } from '../../../layouts/LoggedOutLayout';
import * as Yup from 'yup';
import {
  Container,
  TextField,
  InputAdornment,
  Link,
  Button,
  Paper,
  Theme,
  createStyles,
  withStyles,
  Typography,
  Box,
} from '@material-ui/core';
import { capitalize } from 'lodash'
import { Link as RouterLink } from 'react-router-dom';
import { Lock as LockIcon, Person as PersonIcon } from '@material-ui/icons';
import { Formik, FormikProps, FormikActions, FormikValues } from 'formik';
import { history } from '../../../services/history/history';
import { login, fetchSaveRedProfile } from '../../../services/api/api';
import { saveAccessToken, getRedProfile } from '../../../services/auth/auth';
import { RediLocation } from '../../../types/RediLocation'
import { buildFrontendUrl } from '../../../utils/build-frontend-url';

const styles = (theme: Theme) =>
  createStyles({
    loginError: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.error.main,
      color: 'white',
    },
    headingMargin: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(5),
    },
    navigationBox: {
      marginTop: theme.spacing(4),
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

function makeLocationString(location: string) {
  return `${location.charAt(0).toUpperCase()}${location.substr(1)}`
}

export default function Login() {
  const [loginError, setLoginError] = useState<string>('');
  const [isWrongRediLocationError, setIsWrongRediLocationError] = useState<boolean>(false);

  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<LoginFormValues>
  ) => {
    const formValues = values as LoginFormValues;
    try {
      const accessToken = await login(formValues.username, formValues.password);
      saveAccessToken(accessToken);
      const redProfile = await fetchSaveRedProfile(accessToken);
      if (redProfile.rediLocation !== (process.env.REACT_APP_REDI_LOCATION as RediLocation)) {
        return setIsWrongRediLocationError(true)
      }
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
        render={props => <Form {...props} loginError={loginError} isWrongRediLocationError={isWrongRediLocationError} />}
      />
    </LoggedOutLayout>
  );
}

const Form = withStyles(styles)(
  (
    props: FormikProps<LoginFormValues> & {
      loginError: string;
      isWrongRediLocationError: boolean;
      classes: {
        loginError: string;
        headingMargin: string;
        navigationBox: string;
      };
    }
  ) => {
    const {
      classes,
      loginError,
      isWrongRediLocationError,
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
      <Container maxWidth="sm">
        <Typography
          variant="h5"
          align="center"
          className={classes.headingMargin}
        >
          Login to ReDI Connect
        </Typography>
        {isWrongRediLocationError && (
          <Paper className={classes.loginError}>
            You've tried to log into ReDI Connect <strong>{capitalize((process.env.REACT_APP_REDI_LOCATION as RediLocation))}</strong>. 
            <br /><br />Your user account is linked to ReDI Connect <strong>{capitalize(getRedProfile().rediLocation)}</strong>.
            <br /><br />Please use ReDI Connect <strong>{capitalize(getRedProfile().rediLocation)}</strong> that you may always access at this address:
            <br /><br /><a href={buildFrontendUrl(process.env.NODE_ENV, getRedProfile().rediLocation)}>{buildFrontendUrl(process.env.NODE_ENV, getRedProfile().rediLocation)}</a>
          </Paper>
        )}
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
          <Box className={classes.navigationBox}>
            <Typography align="center">
              <Link
                component={RouterLink}
                to="/front/reset-password/request-reset-password-email"
              >
                Forgot your password?
              </Link>
            </Typography>
          </Box>
          <Box className={classes.navigationBox}>
            <Typography align="center">
              New to ReDI Connect? Join as a{' '}
              <Link component={RouterLink} to="/front/signup/mentee">
                student
              </Link>{' '}
              or{' '}
              <Link component={RouterLink} to="/front/signup/mentor">
                mentor
              </Link>
              .
            </Typography>
          </Box>
        </form>
      </Container>
    );
  }
);
