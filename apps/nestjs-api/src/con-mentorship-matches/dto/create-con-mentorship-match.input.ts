import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateConMentorshipMatchInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
