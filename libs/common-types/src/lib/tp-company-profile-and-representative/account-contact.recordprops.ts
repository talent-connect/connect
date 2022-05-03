import { plainToClass, Type } from 'class-transformer'
import {
  RecordProps,
  PicklistValue,
  PicklistValuesSemicolonSeparated,
} from '../base-interfaces-types-classes'

export class AccountContactRecordProps implements RecordProps {
  Id: string
  AccountId: string
  ContactId: string
  Roles: PicklistValuesSemicolonSeparated
  ReDI_Company_Representative_Status__c: PicklistValue

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  public static create(rawProps: any) {
    return plainToClass(AccountContactRecordProps, rawProps, {})
  }
}
