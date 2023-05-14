import { plainToClass, Type } from 'class-transformer'
import {
  PicklistValue,
  PicklistValuesSemicolonSeparated,
  RecordProps,
} from '../../base-interfaces-types-classes'

class JobseekerLineItemsWrapper {
  @Type(() => JobseekerLineItem)
  records?: Array<JobseekerLineItem>
}

class JobseekerLineItem {
  RecordType: {
    DeveloperName: 'Experience' | 'Education'
  }
  Id: string
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
  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date
}

class JobseekerProfileItemWrapper {
  @Type(() => JobseekerProfileItem)
  records: Array<JobseekerProfileItem>
}

class JobseekerProfileItem {
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
  Joins_Berlin_23_Summer_Job_Fair__c: boolean
  Joins_Munich_23_Summer_Job_Fair__c: boolean
  Is_Visible_to_Companies__c: boolean
  Is_Hired__c: boolean
  Federal_State__c?: PicklistValue
  Willing_to_Relocate__c: boolean
  Immigration_Status__c?: PicklistValue
}

class JobseekerLanguageItemsWrapper {
  @Type(() => JobseekerLanguageItem)
  records: Array<JobseekerLanguageItem>
}

class LanguageWrapper {
  Slug__c: string
}

class JobseekerLanguageItem {
  Id: string
  hed__Fluency__c: string
  @Type(() => LanguageWrapper)
  hed__Language__r: LanguageWrapper
}
export class TpJobseekerDirectoryEntryRecordProps implements RecordProps {
  Id: string

  FirstName?: string
  LastName: string
  ReDI_Email_Address__c: string
  ReDI_Behance_URL__c?: string
  @Type(() => Date)
  ReDI_Birth_Date__c?: Date
  ReDI_Dribbble_URL__c?: string
  ReDI_Gender_Pronouns__c?: string
  ReDI_Slack_Username__c?: string
  ReDI_Stack_Overflow_URL__c?: string
  ReDI_Website_Portfolio__c?: string
  LinkedIn_Profile__c?: string
  ReDI_GitHub_Profile__c?: string
  MobilePhone?: string
  redi_Contact_Gender__c?: string
  Loopback_User_ID__c: string

  ReDI_Age__c: number

  ReDI_First_Point_of_Contact_Talent_Pool__c?: string
  ReDI_First_Point_of_Contact_Other_TP__c?: string

  CON_TP_Mailing_Address__c?: string

  @Type(() => JobseekerLineItemsWrapper)
  Jobseeker_Line_Items__r?: JobseekerLineItemsWrapper

  @Type(() => JobseekerProfileItemWrapper)
  Jobseeker_Profiles__r: JobseekerProfileItemWrapper

  @Type(() => JobseekerLanguageItemsWrapper)
  hed__Contact_Languages__r?: JobseekerLanguageItemsWrapper

  // Only computed fields below
  Name: string // full name

  public static create(rawProps: any) {
    return plainToClass(TpJobseekerDirectoryEntryRecordProps, rawProps, {})
  }
}
