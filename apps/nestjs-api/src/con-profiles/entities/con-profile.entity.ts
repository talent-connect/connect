import {
  Field,
  FieldMiddleware,
  InputType,
  MiddlewareContext,
  NextFn,
  ObjectType,
  PartialType,
} from '@nestjs/graphql'

@ObjectType()
export class ConProfile {
  @Field({ name: 'id' })
  Id: string

  // @Field({ name: 'firstName' })
  // FirstName: string

  @Field({ name: 'expectations' })
  Expectations__c: string

  @Field({ name: 'personalDescription' })
  Personal_Description__c: string

  // @Field({ name: 'profileType' })
  // RecordType: string
}

@ObjectType()
export class Contact__r {
  FirstName: string
}
