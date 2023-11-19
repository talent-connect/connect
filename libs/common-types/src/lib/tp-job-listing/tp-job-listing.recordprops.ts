import { plainToClass, Type } from 'class-transformer'
import { PicklistValue, RecordProps } from '../base-interfaces-types-classes'

export class TpJobListingRecordProps implements RecordProps {
  Id: string

  Status__c?: PicklistValue
  Title__c?: string
  Location__c?: string
  Summary__c?: string
  Ideal_Technical_Skills__c?: string
  Relates_to_Positions__c?: string
  Employment_Type__c?: string
  Language_Requirements__c?: string
  Salary_Range__c?: string
  Remote_Possible__c: boolean
  Federal_State__c?: PicklistValue

  Account__c: string

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date
  @Type(() => Date)
  Expires_At__c?: Date

  Account__r: {
    Name: string
    ReDI_Avatar_Image_URL__c?: string
  }

  public static create(rawProps: any) {
    return plainToClass(TpJobListingRecordProps, rawProps, {})
  }
}
