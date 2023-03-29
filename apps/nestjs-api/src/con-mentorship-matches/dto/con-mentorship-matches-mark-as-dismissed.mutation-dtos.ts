import { InputType, ObjectType } from '@nestjs/graphql'

@InputType('ConMentorshipMatchesMarkAsDismissedInputDto')
export class ConMentorshipMatchesMarkAsDismissedInputDto {
  conMentorshipMatchId: string
}

@ObjectType('ConMentorshipMatchesMarkAsDismissedOutputDto')
export class ConMentorshipMatchesMarkAsDismissedOutputDto {
  ok: boolean
  id: string
}
