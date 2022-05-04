import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class ConProblemReport {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
