import React from 'react';
import { RouteComponentProps } from 'react-router';

interface RouteParams {
  type: string;
}

export default function SignUpComplete({
  match: {
    params: { type },
  },
}: RouteComponentProps<RouteParams>) {
  // TODO: Replace 'any' with whatever is TS-appropriate
  // const Comp: any = (props: any) => <Link {...props} to="/app/dashboard" />;
  return (
    <>
      {type === 'public-sign-up-mentee-pending-review' && (
        <>
          <p>
            Thanks for registering! We're thrilled that you're ReDI :) But there is one last step
            before we can activate your profile because we want to make sure you find the right
            mentor:
          </p>
          <p>
            Simply contact Miriam via e-mail miriam@redi-school.org to schedule a meeting. Or just
            turn up anytime between 5 and 8 on a Tuesday at ReDI School.
          </p>
          <p>You can also find and write to Miriam on the ReDI Slack.</p>
        </>
      )}
      {type === 'public-sign-up-mentor-pending-review' && (
        <>
          <p>
            Thanks for registering! We're thrilled that you're ReDI :) We promise to review your
            profile as quickly as possible. We'll send you an email once we're done.
          </p>
        </>
      )}
    </>
  );
}
