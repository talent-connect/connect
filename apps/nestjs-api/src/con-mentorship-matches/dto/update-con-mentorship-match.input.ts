import { CreateConMentoringSessionInput } from './create-con-mentorship-match.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateConMentoringSessionInput extends PartialType(
  CreateConMentoringSessionInput
) {
  @Field(() => Int)
  id: number
}
