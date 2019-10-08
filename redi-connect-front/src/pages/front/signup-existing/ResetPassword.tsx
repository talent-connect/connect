import React, { useState } from "react";
import { LoggedOutLayout } from "../../../layouts/LoggedOutLayout";
import * as Yup from "yup";
import {
  TextField,
  InputAdornment,
  Button,
  Paper,
  Theme,
  createStyles,
  withStyles
} from "@material-ui/core";
import { Lock as LockIcon } from "@material-ui/icons";
import { Formik, FormikProps, FormikActions, FormikValues } from "formik";
import { history } from "../../../services/history/history";
import {
  setPassword,
  giveGdprConsent,
  activateUser
} from "../../../services/api/api";

const styles = (theme: Theme) =>
  createStyles({
    formError: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.error.main,
      color: "white"
    }
  });

interface ResetPasswordValues {
  password: string;
  passwordConfirm: string;
}

const initialValues: ResetPasswordValues = {
  password: "",
  passwordConfirm: ""
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password")
    .label("Password"),
  passwordConfirm: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match")
});

const ResetPassword = () => {
  const [formError, setFormError] = useState<string>("");

  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<ResetPasswordValues>
  ) => {
    try {
      await setPassword(values.password);
      await giveGdprConsent();
      await activateUser();
      history.push("/app/dashboard");
    } catch (err) {
      setFormError("Invalid username or password");
    }
    actions.setSubmitting(false);
  };

  return (
    <LoggedOutLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        render={props => <Form {...props} formError={formError} />}
      />
    </LoggedOutLayout>
  );
};
export default ResetPassword;

const Form = withStyles(styles)(
  (
    props: FormikProps<ResetPasswordValues> & {
      formError: string;
      classes: { formError: string };
    }
  ) => {
    const {
      classes,
      formError,
      values: { password, passwordConfirm },
      errors,
      touched,
      handleChange,
      isValid,
      isSubmitting,
      setFieldTouched,
      submitForm
    } = props;

    const change = (name: any, e: any) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };

    return (
      <>
        <h3>Pick a password</h3>
        {formError && <Paper className={classes.formError}>{formError}</Paper>}
        <form onSubmit={e => e.preventDefault()}>
          <TextField
            id="password"
            name="password"
            type="password"
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
            label="Password*"
            value={password}
            onChange={change.bind(null, "password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
            }}
            fullWidth
            margin="normal"
            disabled={isSubmitting}
          />
          <TextField
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            helperText={touched.passwordConfirm ? errors.passwordConfirm : ""}
            error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
            label="Repeat password*"
            value={passwordConfirm}
            onChange={change.bind(null, "passwordConfirm")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
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
            Set your password
          </Button>
        </form>
      </>
    );
  }
);
