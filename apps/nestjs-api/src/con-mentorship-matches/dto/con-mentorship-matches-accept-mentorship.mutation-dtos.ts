import { InputType, ObjectType } from '@nestjs/graphql'

@InputType('ConMentorshipMatchesAcceptMentorshipInputDto')
export class ConMentorshipMatchesAcceptMentorshipInputDto {
  mentorshipMatchId: string
  mentorReplyMessageOnAccept: string
}

@ObjectType('ConMentorshipMatchesAcceptMentorshipOutputDto')
export class ConMentorshipMatchesAcceptMentorshipOutputDto {
  ok: boolean
  id: string
}
