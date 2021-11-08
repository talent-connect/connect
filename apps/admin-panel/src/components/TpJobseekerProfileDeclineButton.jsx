import React from 'react'
import Button from '@mui/material/Button'
import { tpJobseekerProfileBuildApproveOrRejectButton } from './component-factories/tp-jobseeker-profile-build-approve-or-decline-button'

export const TpJobseekerProfileDeclineButton = tpJobseekerProfileBuildApproveOrRejectButton(
  'DECLINE'
)
