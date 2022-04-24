import {
  Persistence,
  PersistenceMetadata,
} from '../base-interfaces-types-classes'
import { ConProfilePersistenceProps } from './con-profile.persistenceprops'

export class ConProfilePersistence extends Persistence<ConProfilePersistenceProps> {
  props: ConProfilePersistenceProps

  private constructor(props: ConProfilePersistenceProps) {
    super(props)
  }

  public static create(rawProps: ConProfilePersistenceProps) {
    const props = ConProfilePersistenceProps.create(rawProps)
    return new ConProfilePersistence(props)
  }

  public static metadata: PersistenceMetadata = {
    SALESFORCE_OBJECT_NAME: 'ReDI_Connect_Profile__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'RecordType.DeveloperName', // Enum: MENTOR/MENTEE
      'Contact__r.FirstName',
      'Contact__r.LastName',
      'Contact__r.ReDI_Behance_URL__c',
      'Contact__r.ReDI_Birth_Date__c',
      'Contact__r.ReDI_Dribbble_URL__c',
      'Contact__r.ReDI_Preferred_Pronouns__c',
      'Contact__r.ReDI_Slack_Username__c',
      'Contact__r.ReDI_Stack_Overflow_URL__c',
      'Contact__r.LinkedIn_Profile__c',
      'Contact__r.ReDI_GitHub_Profile__c',
      'Contact__r.MobilePhone',
      'Contact__r.redi_Contact_Gender__c',
      'Avatar_Image_URL__c',
      'CreatedDate',
      'Desired_Job__c',
      'Education__c',
      'Expectations__c',
      'Job_Title__c',
      'Languages__c',
      'LastActivityDate',
      'LastModifiedDate',
      'Main_Occupation_Other__c',
      'Mentoring_Topics__c',
      'Name',
      'Occupation__c',
      'Occupation_Category__c',
      'Opt_Out_Mentees_From_Other_Locations__c',
      'Personal_Description__c',
      'Place_of_Employment__c',
      'Profile_First_Approved_At__c',
      'Profile_Status__c',
      'ReDI_Course__c',
      'ReDI_Location__c',
      'Study_Name__c',
      'Study_Place__c',
      'Work_Place__c',
    ],
  }
}