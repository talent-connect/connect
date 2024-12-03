import { plainToClass, Type } from 'class-transformer'
import {
  PicklistValue,
  PicklistValuesSemicolonSeparated,
  RecordProps,
} from '../../base-interfaces-types-classes'

export class TpJobseekerProfileRecordProps implements RecordProps {
  Id: string
  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  ReDI_Location__c?: PicklistValue
  Avatar_Image_URL__c?: string
  Desired_Positions__c?: PicklistValuesSemicolonSeparated
  Location__c?: string
  Desired_Employment_Type__c?: PicklistValuesSemicolonSeparated
  Availability__c?: PicklistValue
  @Type(() => Date)
  Availability_Date__c?: Date
  About_Yourself__c?: string
  Top_Skills__c?: PicklistValuesSemicolonSeparated
  Profile_Status__c: PicklistValue
  ReDI_Joins_25_Winter_Talent_Summit__c?: boolean
  Is_Visible_to_Companies__c: boolean
  Federal_State__c?: PicklistValue
  Willing_to_Relocate__c: boolean
  Immigration_Status__c?: PicklistValue
  Subscribed_to_TP_Marketing_Emails__c: boolean
  Contact__c: string

  public static create(rawProps: any) {
    return plainToClass(TpJobseekerProfileRecordProps, rawProps, {})
  }
}
