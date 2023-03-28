import { plainToClass, Type } from 'class-transformer'
import {
  PicklistValue,
  PicklistValuesSemicolonSeparated,
  RecordProps,
} from '../base-interfaces-types-classes'

export class TpJobseekerCvRecordProps implements RecordProps {
  Id: string

  About_Yourself__c?: string
  Availability__c?: PicklistValue
  @Type(() => Date)
  Availability_Date__c?: Date
  Avatar_Image_URL__c?: string
  Behance_URL__c?: string
  Contact__c: string
  Desired_Employment_Type__c?: PicklistValuesSemicolonSeparated
  Desired_Positions__c?: PicklistValuesSemicolonSeparated
  Dribbble_URL__c?: string
  Email__c?: string
  First_Name__c?: string
  GitHub_URL__c?: string
  Immigration_Status__c?: PicklistValue
  Name: string // the CV name
  Last_Name__c?: string
  LinkedIn_URL__c?: string
  Location__c?: string
  Mailing_Address__c?: string
  Phone_Number__c?: string
  Stack_Overflow_URL__c?: string
  Top_Skills__c?: PicklistValuesSemicolonSeparated
  Twitter_URL__c?: string
  Website_Portfolio__c?: string
  Willing_to_Relocate__c?: boolean

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  public static create(rawProps: any) {
    return plainToClass(TpJobseekerCvRecordProps, rawProps, {})
  }
}
