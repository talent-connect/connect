import { CreateConMentorshipMatchInput } from './create-con-mentorship-match.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateConMentorshipMatchInput extends PartialType(
  CreateConMentorshipMatchInput
) {
  @Field(() => Int)
  id: number
}
