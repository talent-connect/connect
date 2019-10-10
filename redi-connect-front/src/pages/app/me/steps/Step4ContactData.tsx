import React from "react";
import clsx from "clsx";
import { TextField, InputAdornment } from "@material-ui/core";
import { SignUpFormValues, SignUpFormType } from "../Me";
import { FormikProps } from "formik";
import Icon from "@material-ui/core/Icon";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

export const Step4ContactData = (
  props: FormikProps<SignUpFormValues> & { type: SignUpFormType }
) => {
  const {
    values: {
      contactEmail,
      linkedInProfileUrl,
      slackUsername,
      telephoneNumber
    },
    errors,
    touched,
    handleChange,
    // isValid,
    isSubmitting,
    setFieldTouched
  } = props;

  const change = (name: any, e: any) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      <h2>Contact data</h2>
      <TextField
        id="contactEmail"
        name="contactEmail"
        helperText={touched.contactEmail ? errors.contactEmail : ""}
        error={touched.contactEmail && Boolean(errors.contactEmail)}
        label="Email*"
        value={contactEmail}
        onChange={change.bind(null, "contactEmail")}
        disabled={isSubmitting}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          )
        }}
      />
      <TextField
        id="linkedInProfileUrl"
        name="linkedInProfileUrl"
        helperText={touched.linkedInProfileUrl ? errors.linkedInProfileUrl : ""}
        error={touched.linkedInProfileUrl && Boolean(errors.linkedInProfileUrl)}
        label="LinkedIn Profile"
        value={linkedInProfileUrl}
        onChange={change.bind(null, "linkedInProfileUrl")}
        disabled={isSubmitting}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className={clsx("fab fa-linkedin")} />
            </InputAdornment>
          )
        }}
      />
      <TextField
        id="slackUsername"
        name="slackUsername"
        helperText={touched.slackUsername ? errors.slackUsername : ""}
        error={touched.slackUsername && Boolean(errors.slackUsername)}
        label="Username in ReDI Slack"
        value={slackUsername}
        onChange={change.bind(null, "slackUsername")}
        disabled={isSubmitting}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className={clsx("fab fa-slack")} />
            </InputAdornment>
          )
        }}
      />
      <TextField
        id="telephoneNumber"
        name="telephoneNumber"
        helperText={touched.telephoneNumber ? errors.telephoneNumber : ""}
        error={touched.telephoneNumber && Boolean(errors.telephoneNumber)}
        label="Telephone number"
        value={telephoneNumber}
        onChange={change.bind(null, "telephoneNumber")}
        disabled={isSubmitting}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          )
        }}
      />
    </>
  );
};
