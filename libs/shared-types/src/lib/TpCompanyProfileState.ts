export const TpCompanyProfileState = {
  'drafting-profile': 'drafting-profile',
  'submitted-for-review': 'submitted-for-review',
  'profile-approved': 'profile-approved',
} as const

export type TpCompanyProfileState =
  typeof TpCompanyProfileState[keyof typeof TpCompanyProfileState]
