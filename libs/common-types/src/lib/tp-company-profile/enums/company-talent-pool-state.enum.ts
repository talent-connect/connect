import { registerEnumType } from '@nestjs/graphql'

export enum CompanyTalentPoolState {
  'DRAFTING_PROFILE' = 'DRAFTING_PROFILE',
  'SUBMITTED_FOR_REVIEW' = 'SUBMITTED_FOR_REVIEW',
  'PROFILE_APPROVED' = 'PROFILE_APPROVED',
}
registerEnumType(CompanyTalentPoolState, {
  name: 'CompanyTalentPoolState',
})
