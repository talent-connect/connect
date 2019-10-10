import React from 'react';
import { LoggedOutLayout } from '../../../layouts/LoggedOutLayout';
import {
  Link,
  Button,
  Typography,
  useTheme,
  Container,
  InputAdornment,
  Snackbar,
  SnackbarContent,
  Slide,
} from '@material-ui/core';
import { Email as EmailIcon } from '@material-ui/icons';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import * as yup from 'yup';
import {
  yupErrorToSimpleObject,
  ErrorSimpleObject,
} from '../../../utils/yup-error-to-simple-object';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import AppNotification, {
  showNotification,
} from '../../../components/AppNotification';
import { requestResetPasswordEmail } from '../../../services/api/api';

const useStyles = (props: any) => {
  const theme = useTheme();
  return makeStyles({
    heading: {
      margin: theme.spacing(5),
    },
    elementsBelowFormTopMargin: {
      marginTop: theme.spacing(6),
    },
  })(props);
};

interface IFormValues {
  email?: string;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(`That doesn’t look quite right... please provide a valid email.`)
    .required('Please provide an email address.'),
});

const validateForm = async (
  values: IFormValues
): Promise<ErrorSimpleObject> => {
  try {
    await validationSchema.validate(values, { abortEarly: false });
    return {};
  } catch (err) {
    const finalFormCompatibleErrors = yupErrorToSimpleObject(err);
    return finalFormCompatibleErrors;
  }
};

export const RequestResetPasswordEmail = (props: any) => {
  const styleClasses = useStyles(props);

  const onSubmit = async (values: IFormValues) => {
    try {
      // Cast to string is safe as this only called if validated
      await requestResetPasswordEmail(values.email as string);
      onServerRequestSuccess();
    } catch (err) {
      onServerRequestError({});
    }
  };

  const onServerRequestSuccess = () => {
    showNotification(
      'All good! Please check your email to set a new password :)',
      {
        variant: 'success',
        autoHideDuration: 6000,
      }
    );
  };

  const onServerRequestError = (err: any) => {
    showNotification(
      'Oh no, something went wrong :( Did you type your email address correctly?',
      { variant: 'error' }
    );
  };

  return (
    <LoggedOutLayout>
      <Container maxWidth="sm">
        <Typography
          variant="h5"
          align="center"
          className={styleClasses.heading}
        >
          Reset your password
        </Typography>
        <p>
          Just let us know the email you use to sign in to ReDI Connect and
          we’ll help you get your password back.
        </p>
        <Form
          onSubmit={onSubmit}
          validate={validateForm}
          render={({
            handleSubmit,
            submitting: isSubmitting,
            values,
            errors,
            valid: isValid,
          }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Field
                fullWidth
                id="email"
                name="email"
                component={TextField}
                disabled={isSubmitting}
                type="text"
                label="Email"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                onClick={() => isValid && handleSubmit()}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
              >
                Send Password Reset Email
              </Button>
            </form>
          )}
        />
        <Typography
          align="center"
          className={styleClasses.elementsBelowFormTopMargin}
        >
          <Link component={RouterLink} to="/front/login">
            Take me back to log in
          </Link>
        </Typography>
      </Container>
    </LoggedOutLayout>
  );
};
