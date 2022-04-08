import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ConProfileRecordType {
  @Field({ name: 'profileTypeKey' })
  Name: string
}
