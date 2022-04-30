import { ArgsType, Field, ID } from '@nestjs/graphql'
import { MentorshipMatchStatus } from '@talent-connect/common-types'

@ArgsType()
export class FindMentorshipMatchesArgs {
  @Field((of) => MentorshipMatchStatus)
  status?: MentorshipMatchStatus
}
