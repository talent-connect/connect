import React from 'react';
import { buildSignUpForm } from "./factory";
import { LoggedOutLayout } from "../../../layouts/LoggedOutLayout";

const Form = buildSignUpForm("mentor");

export const SignUpFormMentor = () => (
  <LoggedOutLayout>
    <Form />
  </LoggedOutLayout>
)