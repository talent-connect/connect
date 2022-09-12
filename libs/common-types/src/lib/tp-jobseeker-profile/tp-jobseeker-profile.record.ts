import { Record, RecordMetadata } from '../base-interfaces-types-classes'
import { TpJobseekerProfileRecordProps } from './tp-jobseeker-profile.recordprops'

export class TpJobseekerProfileRecord extends Record<TpJobseekerProfileRecordProps> {
  props: TpJobseekerProfileRecordProps

  private constructor(props: TpJobseekerProfileRecordProps) {
    super(props)
  }

  public static create(rawProps: TpJobseekerProfileRecordProps) {
    const props = TpJobseekerProfileRecordProps.create(rawProps)
    return new TpJobseekerProfileRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Jobseeker_Profile__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Contact__r.Id',
      'Contact__r.Loopback_User_ID__c',
      'Contact__r.ReDI_Email_Address__c',
      'Contact__r.Name',
      'Contact__r.FirstName',
      'Contact__r.LastName',
      'Contact__r.ReDI_Behance_URL__c',
      'Contact__r.ReDI_Birth_Date__c',
      'Contact__r.ReDI_Dribbble_URL__c',
      'Contact__r.ReDI_Gender_Pronouns__c',
      'Contact__r.ReDI_Slack_Username__c',
      'Contact__r.ReDI_Stack_Overflow_URL__c',
      'Contact__r.CON_TP_Mailing_Address__c',
      'Contact__r.ReDI_Website_Portfolio__c',
      'Contact__r.LinkedIn_Profile__c',
      'Contact__r.ReDI_GitHub_Profile__c',
      'Contact__r.MobilePhone',
      'Contact__r.redi_Contact_Gender__c',
      'Contact__r.LastModifiedDate',
      'Contact__r.CreatedDate',
      'Contact__r.ReDI_Age__c',

      'CreatedDate',
      'LastModifiedDate',
      'Name',
      'ReDI_Location__c',
      'ReDI_Course__c',
      'Avatar_Image_URL__c',
      'Desired_Positions__c',
      'Location__c',
      'Desired_Employment_Type__c',
      'Availability__c',
      'Availability_Date__c',
      'About_Yourself__c',
      'Top_Skills__c',
      'Profile_Status__c',
      'Is_Job_Fair_2022_Participant__c',
      'Is_Visible_to_Companies__c',
      'Is_Hired__c',
      'Federal_State__c',
      'Willing_to_Relocate__c',
    ],
    SALESFORCE_CHILD_OBJECTS: [
      // {
      //   name: 'Jobseeker_Line_Item__r',
      //   fields: ['Certification_Type__c', 'City__c', 'Company__c'],
      // },
    ],
  }
}
