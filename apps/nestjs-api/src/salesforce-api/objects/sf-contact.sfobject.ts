import { ObjectType } from '@nestjs/graphql'
import { ConProfile } from '../../con-profiles/entities/con-profile.entity'
import { SfBaseObject } from './types/sf-base-object.interface'

@ObjectType()
export class SfContact implements SfBaseObject {
  readonly SALESFORCE_OBJECT_NAME = 'Contact'
  readonly SALESFORCE_OBJECT_FIELDS = null

  FirstName?: string
  LastName: string
  ReDI_Behance_URL__c?: string
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
