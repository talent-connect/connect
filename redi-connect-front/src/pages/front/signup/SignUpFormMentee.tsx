import React from "react";
import { buildSignUpForm } from "./signUpFormFactory";
import Account from "../../../components/templates/Account";

const Form = buildSignUpForm("public-sign-up-mentee-pending-review");

export default function SignUpFormMentee() {
  return (
    <Account>
      <Form />
    </Account>
  );
}
