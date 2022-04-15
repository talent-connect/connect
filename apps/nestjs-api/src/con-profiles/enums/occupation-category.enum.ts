import { registerEnumType } from '@nestjs/graphql'

export enum OccupationCategory {
  job = 'job',
  student = 'student',
  lookingForJob = 'lookingForJob',
  other = 'other',
}
registerEnumType(OccupationCategory, { name: 'OccupationCategory' })
