/**
 * Although the natural lifecycle of a TpCompanyProfileState
 * is drafting-ptofile => submitted-for-review => profile-approved,
 * companies can be approved even if they are not submitted-for-review
 * yet. (See PR: https://github.com/talent-connect/connect/pull/460).
 * In some edge cases where companies reach out to a ReDI Admin and
 * get approved, the TpCompanyProfileState can go from drafting-profile
 * to profile-approved.
 */
export const TpCompanyProfileState = {
  'drafting-profile': 'drafting-profile',
  'submitted-for-review': 'submitted-for-review',
  'profile-approved': 'profile-approved',
} as const

export type TpCompanyProfileState =
  typeof TpCompanyProfileState[keyof typeof TpCompanyProfileState]
