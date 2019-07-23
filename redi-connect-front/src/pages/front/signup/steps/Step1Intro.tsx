import React from "react";
import * as Yup from 'yup';
import { TextField, InputAdornment } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import { FormikProps } from "formik";
import { SignUpFormValues, SignUpFormType } from "../factory";

export const validationSchema = Yup.object({
  username: Yup.string()
    .email()
    .label('Email')
    .max(255),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
    .label('Password'),
  passwordConfirm: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
})

export const Step1Intro = (props: FormikProps<SignUpFormValues> & {type: SignUpFormType}) => {
  const {
    values: { username, password, passwordConfirm },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    type
  } = props;

  const change = (name: any, e: any) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      {type === 'public-sign-up-mentee-pending-review' && <>
        <p>Welcome to ReDI Connect! What is the mentorship program?</p>
        <p>We want to help you reach your (career) goals by finding you a personal mentor who can give you guidance. We invite professionals that are working in the IT sector or in other companies in Berlin to register at ReDI Connect in order to share their knowledge & experience with you. You get personal & career advice, learning from people with more work experience, build personal & professional network, help with orientation in the job market, support with your courses. You have to attend at least 5 meetings minimum of 1 hour per month (or as discussed with your mentor). </p>
        <p>So let’s get started in matching you with the right mentor!</p>
        <p>You can now fill out your profile, we will guide you through the process. </p>
        <p>Once you have filled out your profile you will receive profiles of available mentors. You can apply by writing the mentors a short message. Be creative, introduce yourself in 1-5 sentences.</p>
        <p>Please write us an email if you encounter any problems while filling out your profile: <a href="mailto:Career@redi-school.org">Career@redi-school.org</a></p>
        <p>Your Career Support Team</p>
        <p>Your account requires a password to set up your profile:</p>
      </>}
      {type === 'public-sign-up-mentor-pending-review' && <>
        <p>Hi!</p>
        <p>Welcome to the ReDI School of Digital Integration and thank you for registering as a mentor at ReDI Connect. At ReDI we believe that integration starts with the simple word „Hello“.  So: Hello!  With the mentorship program we want to connect our students with you as mentors because we think finding an answer to a question is easier with a counterpart than alone.  Our students can benefit from your experience, your network, your knowledge and you are able to share your knowledge with new talents, maybe get new ideas, look at things from a different perspective or simply meet a great person!</p>
        <p>You can now fill out your profile, we will guide you through the process.</p>
        <p>Once you have filled out your profile you will receive application(s) from (a) potential mentee(s). Once you have accepted an application you are ready to start your sessions with your mentee.</p>
        <p>Let us know if you need support from us at: <a href="mailto:Career@redi-school.org">Career@redi-school.org</a></p>
        <p>Your Career Support Team</p>
        <p>Your account requires a password to set up your profile:</p>
      </>}
      <TextField
        id="username"
        name="username"
        type="email"
        helperText={touched.username ? errors.username : ""}
        error={touched.username && Boolean(errors.username)}
        label="Username (your email address)*"
        value={username}
        onChange={change.bind(null, 'username')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          )
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        id="password"
        name="password"
        type="password"
        helperText={touched.password ? errors.password : ""}
        error={touched.password && Boolean(errors.password)}
        label="Password*"
        value={password}
        onChange={change.bind(null, 'password')}
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
      <TextField
        id="passwordConfirm"
        name="passwordConfirm"
        type="password"
        helperText={touched.passwordConfirm ? errors.passwordConfirm : ""}
        error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
        label="Repeat password*"
        value={passwordConfirm}
        onChange={change.bind(null, 'passwordConfirm')}
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
    </>
  );
};
