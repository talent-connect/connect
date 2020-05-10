import React from 'react';
import { LoggedOutLayout } from '../../../layouts/LoggedOutLayout';
import { RouteComponentProps } from 'react-router';
import { RediLocation } from '../../../types/RediLocation';

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
    <LoggedOutLayout>
      {type === 'public-sign-up-mentee-pending-review' && (process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'berlin' && (
        <>
          <p>
            Thanks for registering! We're thrilled that you're ReDI :) But there
            is one last step before we can activate your profile because we want
            to make sure you find the right mentor:
          </p>
          <p>
            Simply contact Isabelle via e-mail isabelle@redi-school.org to
            schedule a meeting. Or just turn up anytime between 5 and 8 on a
            Tuesday at ReDI School.
          </p>
          <p>You can also find and write to Isabelle on the ReDI Slack.</p>
        </>
      )}
      {type === 'public-sign-up-mentee-pending-review' && (process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'munich' && (
        <>
          <p>
            We will review your profile and get in touch with you if there is anything missing. Then, we will approve your profile and you can start searching for mentors.
          </p>
          <p>
            If you have any questions or comments, imply contact Christa via e-mail at <a href="mailto:christa@redi-school.org">christa@redi-school.org</a> or slack: Christa Baron
          </p>
        </>
      )}
      {
        type === 'public-sign-up-mentor-pending-review' && (
          <>
            <p>
              Thanks for registering! We're thrilled that you're ReDI :) We
              promise to review your profile as quickly as possible. We'll send
              you an email once we're done.
          </p>
          </>
        )
      }
    </LoggedOutLayout >
  );
}
