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
    SALESFORCE_OBJECT_NAME: 'Contact',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Loopback_User_ID__c',
      'ReDI_Email_Address__c',
      'Name',
      'FirstName',
      'LastName',
      'ReDI_Behance_URL__c',
      'ReDI_Birth_Date__c',
      'ReDI_Dribbble_URL__c',
      'ReDI_Gender_Pronouns__c',
      'ReDI_Slack_Username__c',
      'ReDI_Stack_Overflow_URL__c',
      'CON_TP_Mailing_Address__c',
      'ReDI_Website_Portfolio__c',
      'LinkedIn_Profile__c',
      'ReDI_GitHub_Profile__c',
      'MobilePhone',
      'redi_Contact_Gender__c',
      'ReDI_Age__c',
    ],
    SALESFORCE_CHILD_OBJECTS: [
      {
        name: 'hed__Contact_Languages__r',
        fields: ['hed__Fluency__c', 'hed__Language__r.Name'],
      },
      {
        name: 'Jobseeker_Line_Items__r',
        fields: [
          'RecordType.DeveloperName',
          'Frontend_View_Index__c',
          'Description__c',
          'Institution_City__c',
          'Institution_Country__c',
          'Institution_Name__c',
          'Title__c',
          'Certification_Type__c',
          'Start_Date_Month__c',
          'Start_Date_Year__c',
          'End_Date_Month__c',
          'End_Date_Year__c',
          'Current__c',
          'City__c',
          'Country__c',
          'Company__c',
        ],
      },
      {
        name: 'Jobseeker_Profiles__r',
        fields: [
          'Id',
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
      },
    ],
  }
}
