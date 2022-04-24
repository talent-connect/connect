import { Type } from 'class-transformer'

export class ContactSfProps {
  FirstName?: string
  LastName: string
  ReDI_Behance_URL__c?: string
  @Type(() => Date)
  ReDI_Birth_Date__c?: Date
  ReDI_Dribbble_URL__c?: string
  ReDI_Preferred_Pronouns__c?: string
  ReDI_Slack_Username__c?: string
  ReDI_Stack_Overflow_URL__c?: string
  LinkedIn_Profile__c?: string
  ReDI_GitHub_Profile__c?: string
  MobilePhone?: string
  redi_Contact_Gender__c?: string
  Name: string
}
