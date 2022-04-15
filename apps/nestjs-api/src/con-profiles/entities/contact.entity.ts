import { Expose } from 'class-transformer'
import { BaseDomainModel } from '../../core/models/generics/base-domain.model'
import { SfBaseObject } from '../../salesforce-api/objects/types/sf-base-object.interface'

export class Contact extends BaseDomainModel {
  FirstName?: string
  LastName: string
  // ReDI_Behance_URL__c?: string
  // ReDI_Birth_Date__c?: string
  // ReDI_Dribbble_URL__c?: string
  // ReDI_Preferred_Pronouns__c?: string
  // ReDI_Slack_Username__c?: string
  // ReDI_Stack_Overflow_URL__c?: string
  // LinkedIn_Profile__c?: string
  // ReDI_GitHub_Profile__c?: string
  // MobilePhone?: string
  // redi_Contact_Gender__c?: string
  // Name: string
}
