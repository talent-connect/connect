import React from "react";
import * as Yup from "yup";
import classNames from "classnames";
import { TextField, InputAdornment } from "@material-ui/core";
import { SignUpFormValues, SignUpFormType } from "../factory";
import { FormikProps } from "formik";
import Icon from "@material-ui/core/Icon";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

export const validationSchema = Yup.object({
  contactEmail: Yup.string()
    .email()
    .required()
    .max(255)
    .label("Contact email"),
  linkedInProfileUrl: Yup.string()
    .max(255)
    .url()
    .label("LinkedIn Profile"),
  slackUsername: Yup.string()
    .max(255)
    .label("Slack username"),
  telephoneNumber: Yup.string()
    .max(255)
    .label("Telephone number")
});

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
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className={classNames("fab fa-linkedin")} />
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
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className={classNames("fab fa-slack")} />
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
