import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateConMentoringSessionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
