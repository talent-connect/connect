import { plainToClass, Type } from 'class-transformer'
import {
  PicklistValue,
  PicklistValuesSemicolonSeparated,
  RecordProps,
} from '../base-interfaces-types-classes'
import { ContactRecordProps } from '../common-objects'

class JobseekerLineItemsWrapper {
  @Type(() => JobseekerLineItem)
  records?: Array<JobseekerLineItem>
}

class JobseekerLineItem {
  RecordType: {
    DeveloperName: 'Experience' | 'Education'
  }
  Frontend_View_Index__c: number
  Description__c?: string
  Institution_City__c?: string
  Institution_Country__c?: string
  Institution_Name__c?: string
  Title__c?: string
  Certification_Type__c?: string
  Start_Date_Month__c?: number
  Start_Date_Year__c?: number
  End_Date_Month__c?: number
  End_Date_Year__c?: number
  Current__c: boolean
  City__c?: string
  Country__c?: string
  Company__c?: string
}

export class TpJobseekerProfileRecordProps implements RecordProps {
  Id: string
  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date
  Name: string

  @Type(() => ContactRecordProps)
  Contact__r: ContactRecordProps

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
  Is_Visible_to_Companies__c: boolean
  Is_Hired__c: boolean
  Federal_State__c?: PicklistValue
  Willing_to_Relocate__c: boolean

  @Type(() => JobseekerLineItemsWrapper)
  Jobseeker_Line_Items__r?: JobseekerLineItemsWrapper

  public static create(rawProps: any) {
    return plainToClass(TpJobseekerProfileRecordProps, rawProps, {})
  }
}
