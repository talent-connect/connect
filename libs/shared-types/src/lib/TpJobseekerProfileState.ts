export const TpJobSeekerProfileState = {
  'drafting-profile': 'drafting-profile',
  'submitted-for-review': 'submitted-for-review',
  'profile-approved-awaiting-job-preferences':
    'profile-approved-awaiting-job-preferences',
  'job-preferences-shared-with-redi-awaiting-interview-match':
    'job-preferences-shared-with-redi-awaiting-interview-match',
  'matched-for-interview': 'matched-for-interview',
} as const
export type TpJobSeekerProfileState = typeof TpJobSeekerProfileState[keyof typeof TpJobSeekerProfileState]
