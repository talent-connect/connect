import { InputType, ObjectType } from '@nestjs/graphql'

@InputType('ConMentorshipMatchesCompleteMentorshipInputDto')
export class ConMentorshipMatchesCompleteMentorshipInputDto {
  mentorshipMatchId: string
  mentorMessageOnComplete: string
}

@ObjectType('ConMentorshipMatchesCompleteMentorshipOutputDto')
export class ConMentorshipMatchesCompleteMentorshipOutputDto {
  ok: boolean
  id: string
}
