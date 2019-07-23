import React from 'react';
import { buildSignUpForm } from "./factory";
import { LoggedOutLayout } from "../../../layouts/LoggedOutLayout";

const Form = buildSignUpForm("mentee");

export const SignUpFormMentee = () => (
  <LoggedOutLayout>
    <Form />
  </LoggedOutLayout>
)