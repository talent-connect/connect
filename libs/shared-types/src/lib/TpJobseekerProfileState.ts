export const TpJobseekerProfileState = {
  'drafting-profile': 'drafting-profile',
  'submitted-for-review': 'submitted-for-review',
  'profile-approved': 'profile-approved',
} as const
export type TpJobseekerProfileState = typeof TpJobseekerProfileState[keyof typeof TpJobseekerProfileState]
