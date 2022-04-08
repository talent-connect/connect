import { Field, ObjectType } from '@nestjs/graphql'
import { ConProfileRecordType } from './con-profile-record-type.entity'

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
  @Field({ name: 'profileType' })
  RecordType: ConProfileRecordType
}
