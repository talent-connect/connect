import { Values } from '@talent-connect/typescript-utilities';

export const TpJobSeekerProfileState = {
  'drafting-profile': 'drafting-profile',
  'submitted-for-review': 'submitted-for-review',
  'profile-approved': 'profile-approved',
} as const

export type TpJobSeekerProfileState = Values<typeof TpJobSeekerProfileState>
