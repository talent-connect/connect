import { registerEnumType } from '@nestjs/graphql'

export enum JobseekerProfileStatus {
  DRAFTING_PROFILE = 'DRAFTING_PROFILE',
  SUBMITTED_FOR_REVIEW = 'SUBMITTED_FOR_REVIEW',
  PROFILE_APPROVED = 'PROFILE_APPROVED',
}

registerEnumType(JobseekerProfileStatus, { name: 'JobseekerProfileStatus' })
