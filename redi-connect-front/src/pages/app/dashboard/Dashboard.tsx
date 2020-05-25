import React from 'react'
import { getRedProfile } from '../../../services/auth/auth'
import { DashboardMentee } from './mentee/DashboardMentee'
import { DashboardMentor } from './mentor/DashboardMentor'

export default () => {
  const profile = getRedProfile()
  return (
    <>
      {(profile.userType === 'mentee' || profile.userType === 'public-sign-up-mentee-pending-review') && <DashboardMentee />}
      {profile.userType === 'mentor' && <DashboardMentor />}
    </>
  )
}
