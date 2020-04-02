import React, { useState } from "react";
import Account from "../../../components/templates/Account";
import SignIn from "../../../components/molecules/teaser/SignIn";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  FormikHelpers as FormikActions,
  FormikValues,
  useFormik,
} from "formik";
import { history } from "../../../services/history/history";
import { login, fetchSaveRedProfile } from "../../../services/api/api";
import { saveAccessToken } from "../../../services/auth/auth";

import "./Login.scss";
import { Columns, Form, Heading, Button } from "react-bulma-components";
interface LoginFormValues {
  username: string;
  password: string;
}

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string()
    .email()
    .required()
    .label("Email")
    .max(255),
  password: Yup.string()
    .required()
    .label("Password")
    .max(255),
});

export default function Login() {
  const [loginError, setLoginError] = useState<string>("");

  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<LoginFormValues>
  ) => {
    const formValues = values as LoginFormValues;
    try {
      const accessToken = await login(formValues.username, formValues.password);
      saveAccessToken(accessToken);
      await fetchSaveRedProfile(accessToken);
      history.push("/app/dashboard");
    } catch (err) {
      setLoginError("You entered an incorrect email, password, or both.");
    }
    actions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  const onChange = (name: any, e: any) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <Account>
      <Columns vCentered>
        <Columns.Column
          size={6}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <SignIn />
        </Columns.Column>

        <Columns.Column size={5} offset={1}>
          <Heading
            size={1}
            weight="normal"
            renderAs="h1"
            className="title--border"
          >
            Sign-in
          </Heading>
          <Heading size={4} renderAs="p" subtitle>
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
                    formik.touched.username && Boolean(formik.errors.username)
                      ? "danger"
                      : null
                  }
                  placeholder="Email"
                  value={formik.values.username}
                  onChange={onChange.bind(null, "username")}
                  disabled={formik.isSubmitting}
                />
              </Form.Control>
              {formik.touched.username && Boolean(formik.errors.username) && (
                <Form.Help color="danger">This email is invalid</Form.Help>
              )}
            </Form.Field>

            <Form.Field>
              <Form.Control>
                <Form.Input
                  id="password"
                  name="password"
                  type="password"
                  color={
                    formik.touched.password && Boolean(formik.errors.password)
                      ? "danger"
                      : null
                  }
                  placeholder="Password*"
                  value={formik.values.password}
                  onChange={onChange.bind(null, "password")}
                  disabled={formik.isSubmitting}
                />
              </Form.Control>
              {loginError && <Form.Help color="danger">{loginError}</Form.Help>}
            </Form.Field>
            <Form.Field
              className="login-form__reset-password"
              textTransform="uppercase"
            >
              <Link to="/front/reset-password/request-reset-password-email">
                Forgot your password?
              </Link>
            </Form.Field>
            <Form.Field className="submit-spacer">
              <Button
                className="button--default button--medium"
                fullwidth={true}
                onClick={formik.submitForm}
                disabled={formik.dirty && formik.isValid ? false : true}
              >
                Log in
              </Button>
            </Form.Field>
          </form>
        </Columns.Column>
      </Columns>
    </Account>
  );
}
