import {
  Field,
  FieldMiddleware,
  MiddlewareContext,
  NextFn,
  ObjectType,
} from '@nestjs/graphql'

const recordTypeFlattener: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn
) => {
  const value = await next()
  return value.Name
}

@ObjectType()
export class ConProfile {
  @Field({ name: 'id' })
  Id: string

  @Field({ name: 'expectations' })
  Expectations__c: string

  @Field({ name: 'personalDescription' })
  Personal_Description__c: string

  // @Field((type) => RecordType, { name: 'recordType' })
  // This line and the one above are equivalent
  // @Field({ name: 'profileType' })
  // RecordType: ConProfileRecordType

  @Field({ name: 'profileType', middleware: [recordTypeFlattener] })
  RecordType: string
}
