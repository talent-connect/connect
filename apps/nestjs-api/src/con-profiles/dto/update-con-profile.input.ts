import { CreateConProfileInput } from './create-con-profile.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateConProfileInput extends PartialType(CreateConProfileInput) {
  @Field(() => Int)
  id: number
}
