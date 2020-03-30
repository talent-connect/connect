import React, { useState } from 'react';
import { LoggedOutLayout } from '../../../layouts/LoggedOutLayout';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Formik, FormikActions, FormikValues } from 'formik';
import { history } from '../../../services/history/history';
import { login, fetchSaveRedProfile } from '../../../services/api/api';
import { saveAccessToken } from '../../../services/auth/auth';

import { ReactComponent as WelcomeIllustration } from '../../../assets/welcome-2.svg';

import './Login.scss';
import { Columns, Form, Heading, Content } from 'react-bulma-components';
// import { Heading } from './Heading';

interface LoginFormValues {
  username: string;
  password: string;
}

const initialValues: LoginFormValues = {
  username: '',
  password: '',
};

const BASE_CLASS = 'login-form';

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

export default function Login() {
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
      setLoginError('You entered an incorrect email, password, or both.');
    }
    actions.setSubmitting(false);
  };

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
    <LoggedOutLayout modifier="page--color-half">
      <Columns vCentered>
        <Columns.Column
          size={6}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <WelcomeIllustration className="welcome-2" />
          <Content textTransform="uppercase" size="5">
            Don't have an account yet?{' '}
            <Link to="/front/signup/landing">signup here</Link>
          </Content>
        </Columns.Column>

        <Columns.Column size={4} offset="1">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitForm}
            render={props => (
              <>
                <Heading
                  size="1"
                  weight="medium"
                  renderAs="h1"
                  className="title--border"
                >
                  Sign-in
                </Heading>
                <Heading size="4" renderAs="p" subtitle>
                  Enter your email and password below.
                </Heading>
                <form onSubmit={e => e.preventDefault()} className="login-form">
                  <Form.Field>
                    <Form.Control>
                      <Form.Input
                        id="username"
                        name="username"
                        type="email"
                        color={
                          props.touched.username &&
                          Boolean(props.errors.username)
                            ? 'danger'
                            : ''
                        }
                        placeholder="Email"
                        value={props.values.username}
                        onChange={change.bind(
                          null,
                          'username',
                          props.handleChange,
                          props.setFieldTouched
                        )}
                        disabled={props.isSubmitting}
                      />
                    </Form.Control>
                    {props.touched.username &&
                      Boolean(props.errors.username) && (
                        <Form.Help color="danger">
                          This email is invalid
                        </Form.Help>
                      )}
                  </Form.Field>

                  <Form.Field>
                    <Form.Control>
                      <Form.Input
                        id="password"
                        name="password"
                        type="password"
                        color={
                          props.touched.password &&
                          Boolean(props.errors.password)
                            ? 'danger'
                            : ''
                        }
                        placeholder="Password*"
                        value={props.values.password}
                        onChange={change.bind(
                          null,
                          'password',
                          props.handleChange,
                          props.setFieldTouched
                        )}
                        disabled={props.isSubmitting}
                      />
                    </Form.Control>
                    {loginError && (
                      <Form.Help color="danger">{loginError}</Form.Help>
                    )}
                  </Form.Field>
                  <Form.Field
                    className={`${BASE_CLASS}__reset-password`}
                    textTransform="uppercase"
                  >
                    <Link to="/front/reset-password/request-reset-password-email">
                      Forgot your password?
                    </Link>
                  </Form.Field>
                  <Form.Field className={`${BASE_CLASS}__submit`}>
                    <Button
                      onClick={props.submitForm}
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      disabled={props.isSubmitting || !props.isValid}
                    >
                      Log in
                    </Button>
                  </Form.Field>
                </form>
              </>
            )}
          />
        </Columns.Column>
      </Columns>
    </LoggedOutLayout>
  );
}
