import {
  Field,
  FieldMiddleware,
  InputType,
  MiddlewareContext,
  NextFn,
  ObjectType,
  PartialType,
} from '@nestjs/graphql'

function buildMapper(mapperFn: (input: any) => any): FieldMiddleware {
  return async (ctx: MiddlewareContext, next: NextFn) => {
    const value = await next()
    const mappedValue = mapperFn(value)
    return mappedValue
  }
}

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

  // @Field({ name: 'firstName' })
  // FirstName: string

  @Field({
    name: 'lastName',
    middleware: [buildMapper((contact) => contact.LastName)],
  })
  Contact__r: string

  @Field({ name: 'expectations' })
  Expectations__c: string

  @Field({ name: 'personalDescription' })
  Personal_Description__c: string

  @Field({
    name: 'profileType',
    middleware: [buildMapper((recordType) => recordType.DeveloperName)],
  })
  RecordType: string
}

class ConProfileInput extends PartialType(ConProfile, InputType) {}

const t: ConProfileInput = {}
