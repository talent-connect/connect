import { registerEnumType } from '@nestjs/graphql'

export enum ConnectProfileStatus {
  DRAFTING_PROFILE = 'DRAFTING_PROFILE',
  SUBMITTED_FOR_REVIEW = 'SUBMITTED_FOR_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DEACTIVATED = 'DEACTIVATED',
}

registerEnumType(ConnectProfileStatus, { name: 'ConnectProfileStatus' })
