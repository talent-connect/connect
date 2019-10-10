import React, { useState, useEffect } from 'react';
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
  Container,
  Typography,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import { Lock as LockIcon } from '@material-ui/icons';
import { Formik, FormikProps, FormikActions, FormikValues } from 'formik';
import { history } from '../../../services/history/history';
import {
  setPassword,
  giveGdprConsent,
  activateUser,
  fetchSaveRedProfile,
} from '../../../services/api/api';
import { saveAccessToken } from '../../../services/auth/auth';
import { RouteComponentProps } from 'react-router';
import { showNotification } from '../../../components/AppNotification';

const useStyles = (props: any) => {
  const theme = useTheme();
  return makeStyles({
    heading: {
      margin: theme.spacing(5),
    },
    elementsBelowFormTopMargin: {
      marginTop: theme.spacing(6),
    },
    formError: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.error.main,
      color: 'white',
    },
    paragraph: {
      fontWeight: 300,
    },
    paragraphBelowSubheader: {
      marginTop: '0.3em',
      fontWeight: 300,
    },
    subHeader: {
      marginBottom: 0,
    },
    error: {
      backgroundColor: theme.palette.error.main,
      color: 'white',
    },
  })(props);
};

interface SetNewPasswordValues {
  password: string;
  passwordConfirm: string;
}

const initialValues: SetNewPasswordValues = {
  password: '',
  passwordConfirm: '',
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
    .label('Password'),
  passwordConfirm: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
});

interface IRouteParams {
  accessToken: string;
}

export const SetNewPassword = (props: RouteComponentProps<IRouteParams>) => {
  const styleClasses = useStyles(props);

  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const accessTokenStr = decodeURIComponent(props.match.params.accessToken);
      let accessToken;
      try {
        accessToken = JSON.parse(accessTokenStr);
        saveAccessToken(accessToken);
      } catch (err) {
        console.log('test');
        return setErrorMsg(
          'Sorry, there seems to have been an error. Please try to reset your password again, or contact career@redi-school.org for assistance.'
        );
      }
      try {
        await fetchSaveRedProfile(accessToken);
        setLoading(false);
      } catch (err) {
        return setErrorMsg(
          'Sorry, the link you used seems to have expired. Please contact career@redi-school.org to receive a new one.'
        );
      }
    };
    load();
  }, []);

  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<SetNewPasswordValues>
  ) => {
    try {
      await setPassword(values.password);
      await giveGdprConsent();
      await activateUser();
      showNotification(`Your new password is set and you're logged in :)`, {
        variant: 'success',
        autoHideDuration: 8000,
      });
      history.push('/app/dashboard');
    } catch (err) {
      setFormError('Invalid username or password');
    }
    actions.setSubmitting(false);
  };

  return (
    <LoggedOutLayout>
      {errorMsg && (
        <Paper className={styleClasses.error}>
          <p>{errorMsg}</p>
          <p>
            You can also go here{' '}
            <a href="/front/login">to log in if you have a user.</a>
          </p>
        </Paper>
      )}
      {!loading && !errorMsg && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
          render={props => <Form {...props} formError={formError} />}
        />
      )}
    </LoggedOutLayout>
  );
};
export default SetNewPassword;

const Form = (
  props: FormikProps<SetNewPasswordValues> & {
    formError: string;
  }
) => {
  const {
    formError,
    values: { password, passwordConfirm },
    errors,
    touched,
    handleChange,
    isValid,
    isSubmitting,
    setFieldTouched,
    submitForm,
  } = props;

  const styleClasses = useStyles(props);

  const change = (name: any, e: any) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" className={styleClasses.heading}>
        Reset Your Password
      </Typography>
      <p>
        Nearly there, just enter your new password and you’ll be ReDI Connectin'
        again in seconds...
      </p>
      {formError && (
        <Paper className={styleClasses.formError}>{formError}</Paper>
      )}
      <form onSubmit={e => e.preventDefault()}>
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
        <TextField
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          helperText={touched.passwordConfirm ? errors.passwordConfirm : ''}
          error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
          label="Repeat password*"
          value={passwordConfirm}
          onChange={change.bind(null, 'passwordConfirm')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          margin="normal"
        />
        <Button
          onClick={submitForm}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={isSubmitting || !isValid}
        >
          Set your new password
        </Button>
      </form>
    </Container>
  );
};
