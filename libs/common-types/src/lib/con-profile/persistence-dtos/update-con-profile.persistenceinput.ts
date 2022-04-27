import { ContactSfProps } from '../../salesforce-embedded-objects'
import { ConProfilePersistenceProps } from '../con-profile.persistenceprops'

type UpdateConProfilePersistenceInput = Pick<
  ConProfilePersistenceProps,
  | 'Avatar_Image_URL__c'
  | 'Desired_Job__c'
  | 'Education__c'
  | 'Expectations__c'
  | 'Job_Title__c'
  | 'Languages__c'
  | 'Main_Occupation_Other__c'
  | 'Mentoring_Topics__c'
  | 'Occupation__c'
  | 'Occupation_Category__c'
  | 'Opt_Out_Mentees_From_Other_Locations__c'
  | 'Personal_Description__c'
  | 'Place_of_Employment__c'
  | 'ReDI_Course__c'
  | 'Study_Name__c'
  | 'Study_Place__c'
  | 'Work_Place__c'
> & {
  Contact__r: Pick<
    ContactSfProps,
    | 'FirstName'
    | 'LastName'
    | 'ReDI_Behance_URL__c'
    | 'ReDI_Birth_Date__c'
    | 'ReDI_Dribbble_URL__c'
    | 'ReDI_Preferred_Pronouns__c'
    | 'ReDI_Slack_Username__c'
    | 'ReDI_Stack_Overflow_URL__c'
    | 'LinkedIn_Profile__c'
    | 'ReDI_GitHub_Profile__c'
    | 'MobilePhone'
    | 'redi_Contact_Gender__c'
  >
}
