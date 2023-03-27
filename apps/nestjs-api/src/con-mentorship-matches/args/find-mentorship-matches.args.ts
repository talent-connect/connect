import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { MentorshipMatchStatus } from '@talent-connect/common-types'

@ArgsType()
export class FindMentorshipMatchesArgs {
  filter?: FindMentorshipMatchesArgsFilter
}

@InputType('FindMentorshipMatchesArgsFilter')
class FindMentorshipMatchesArgsFilter {
  @Field((type) => MentorshipMatchStatus)
  status?: MentorshipMatchStatus
}
