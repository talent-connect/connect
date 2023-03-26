import { registerEnumType } from '@nestjs/graphql'

export enum MentorshipMatchStatus {
  'ACCEPTED' = 'ACCEPTED',
  'COMPLETED' = 'COMPLETED',
  'CANCELLED' = 'CANCELLED',
  'APPLIED' = 'APPLIED',
  'DECLINED_BY_MENTOR' = 'DECLINED_BY_MENTOR',
  'INVALIDATED_AS_OTHER_MENTOR_ACCEPTED' = 'INVALIDATED_AS_OTHER_MENTOR_ACCEPTED',
}
registerEnumType(MentorshipMatchStatus, { name: 'MentorshipMatchStatus' })
