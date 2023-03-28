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
  ReDI_Course__c?: PicklistValue
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
  Is_Job_Fair_2022_Participant__c: boolean
  Is_Job_Fair_2023_Participant__c: boolean
  Is_Visible_to_Companies__c: boolean
  Is_Hired__c: boolean
  Federal_State__c?: PicklistValue
  Willing_to_Relocate__c: boolean
  Immigration_Status__c?: PicklistValue
  Contact__c: string

  public static create(rawProps: any) {
    return plainToClass(TpJobseekerProfileRecordProps, rawProps, {})
  }
}
