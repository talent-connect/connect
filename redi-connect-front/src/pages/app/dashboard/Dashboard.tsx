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
    </>
  );
};
