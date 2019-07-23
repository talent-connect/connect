import React from 'react';
import { buildSignUpForm } from "./factory";
import { LoggedOutLayout } from "../../../layouts/LoggedOutLayout";

const Form = buildSignUpForm("public-sign-up-mentee-pending-review");

export const SignUpFormMentee = () => (
  <LoggedOutLayout>
    <Form />
  </LoggedOutLayout>
)