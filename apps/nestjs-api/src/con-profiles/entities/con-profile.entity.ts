import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class ConProfile {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number

  @Field()
  expectations: string

  @Field()
  personalDescription: string
}
