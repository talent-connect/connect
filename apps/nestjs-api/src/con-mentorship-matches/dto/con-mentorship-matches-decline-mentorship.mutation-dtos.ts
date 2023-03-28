import { InputType, ObjectType } from '@nestjs/graphql'
import { DeclineReason } from '@talent-connect/common-types'

@InputType('ConMentorshipMatchesDeclineMentorshipInputDto')
export class ConMentorshipMatchesDeclineMentorshipInputDto {
  mentorshipMatchId: string
  ifDeclinedByMentor_chosenReasonForDecline: DeclineReason
  ifDeclinedByMentor_ifReasonIsOther_freeText: string
  ifDeclinedByMentor_optionalMessageToMentee: string
}

@ObjectType('ConMentorshipMatchesDeclineMentorshipOutputDto')
export class ConMentorshipMatchesDeclineMentorshipOutputDto {
  ok: boolean
  id: string
}
