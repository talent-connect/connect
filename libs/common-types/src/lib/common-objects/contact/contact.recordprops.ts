import { plainToClass, Type } from 'class-transformer'
import { RecordProps } from '../../base-interfaces-types-classes'

export class ContactRecordProps implements RecordProps {
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

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  // Only computed fields below
  Name: string // full name

  public static create(rawProps: any) {
    return plainToClass(ContactRecordProps, rawProps, {})
  }
}
