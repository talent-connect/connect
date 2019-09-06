import React from 'react';
import { LoggedInLayout } from '../../../layouts/LoggedInLayout';
import { getRedProfile } from '../../../services/auth/auth';
import { DashboardMentee } from './mentee/DashboardMentee';
import { DashboardMentor } from './mentor/DashboardMentor';

export const Dashboard = () => {
  const profile = getRedProfile();
  return (
    <>
      {profile.userType === 'mentee' && <DashboardMentee />}
      {profile.userType === 'mentor' && <DashboardMentor />}
      {profile.userType === 'public-sign-up-mentee-pending-review' && (
        <LoggedInLayout>
          <p>
            Thanks for signing up! We are reviewing your profile and will send
            you an email once we're done.
          </p>
          <p>You'll be able to find a mentor once your account is active.</p>
        </LoggedInLayout>
      )}
      {profile.userType === 'public-sign-up-mentor-pending-review' && (
        <LoggedInLayout>
          <p>
            Thanks for signing up! We are reviewing your profile and will send
            you an email once we're done.
          </p>
          <p>
            Students will be able to apply to become your mentee once your
            account is active.
          </p>
        </LoggedInLayout>
      )}
    </>
  );
};
