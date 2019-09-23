import React from "react";
import { LoggedOutLayout } from "../../../layouts/LoggedOutLayout";
import { RouteComponentProps } from "react-router";

interface RouteParams {
  type: string;
}

export default function SignUpComplete({
  match: {
    params: { type }
  }
}: RouteComponentProps<RouteParams>) {
  // TODO: Replace 'any' with whatever is TS-appropriate
  // const Comp: any = (props: any) => <Link {...props} to="/app/dashboard" />;
  return (
    <LoggedOutLayout>
      <p>
        Thanks for registering! We're thrilled that you're ReDI :) We promise to
        review your profile as quickly as possible. We'll send you an email once
        we're done.
      </p>
    </LoggedOutLayout>
  );
}
