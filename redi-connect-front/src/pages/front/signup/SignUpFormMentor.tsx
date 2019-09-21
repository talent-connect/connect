import React from "react";
import { buildSignUpForm } from "./factory";
import { LoggedOutLayout } from "../../../layouts/LoggedOutLayout";

const Form = buildSignUpForm("public-sign-up-mentor-pending-review");

export default function SignUpFormMentor () {
  return (
    <LoggedOutLayout>
      <Form />
    </LoggedOutLayout>
  )
}
