import { InputType, ObjectType } from '@nestjs/graphql'

@InputType('ConMentorshipMatchesApplyForMentorshipInputDto')
export class ConMentorshipMatchesApplyForMentorshipInputDto {
  mentorId: string
  applicationText: string
  expectationText: string
}

@ObjectType('ConMentorshipMatchesApplyForMentorshipOutputDto')
export class ConMentorshipMatchesApplyForMentorshipOutputDto {
  ok: boolean
  id: string
}
