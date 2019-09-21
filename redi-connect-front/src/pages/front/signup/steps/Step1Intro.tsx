import React from 'react';
import * as Yup from 'yup';
import { TextField, InputAdornment } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { FormikProps } from 'formik';
import { SignUpFormValues, SignUpFormType } from '../factory';

export const validationSchema = Yup.object({
  username: Yup.string()
    .email()
    .label("Email")
    .max(255),
  password: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password")
    .label("Password"),
  passwordConfirm: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
});

export const Step1Intro = (
  props: FormikProps<SignUpFormValues> & { type: SignUpFormType }
) => {
  const {
    values: { username, password, passwordConfirm },
    errors,
    touched,
    handleChange,
    // isValid,
    setFieldTouched,
    // type,
  } = props;

  const change = (name: any, e: any) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      <p>Your account requires a password to set up your profile:</p>
      <TextField
        id="username"
        name="username"
        type="email"
        helperText={touched.username ? errors.username : ''}
        error={touched.username && Boolean(errors.username)}
        label="Username (your email address)*"
        value={username}
        onChange={change.bind(null, "username")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        id="password"
        name="password"
        type="password"
        helperText={touched.password ? errors.password : ''}
        error={touched.password && Boolean(errors.password)}
        label="Password*"
        value={password}
        onChange={change.bind(null, "password")}
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
      <TextField
        id="passwordConfirm"
        name="passwordConfirm"
        type="password"
        helperText={touched.passwordConfirm ? errors.passwordConfirm : ''}
        error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
        label="Repeat password*"
        value={passwordConfirm}
        onChange={change.bind(null, "passwordConfirm")}
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
    </>
  );
};
