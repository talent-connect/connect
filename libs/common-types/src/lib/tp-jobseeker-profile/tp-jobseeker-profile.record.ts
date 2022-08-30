import { RecordMetadata } from '../base-interfaces-types-classes'
import { TpJobseekerProfileRecordProps } from './tp-jobseeker-profile.recordprops'

export class TpJobseekerRecord extends Record<TpJobseekerProfileRecordProps> {
  props: TpJobseekerProfileRecordProps

  private constructor(props: TpJobseekerProfileRecordProps) {
    super(props)
  }

  public static create(rawProps: TpJobseekerProfileRecordProps) {
    const props = TpJobseekerProfileRecordProps.create(rawProps)
    return new TpJobseekerRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'ReDI_Connect_Profile__c',
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
      //! TODO: Re-enable when I deal with TP
      // 'Contact__r.ReDI_Preferred_Pronouns__c',
      'Contact__r.ReDI_Slack_Username__c',
      'Contact__r.ReDI_Stack_Overflow_URL__c',
      'Contact__r.LinkedIn_Profile__c',
      'Contact__r.ReDI_GitHub_Profile__c',
      'Contact__r.MobilePhone',
      'Contact__r.redi_Contact_Gender__c',
      'Contact__r.LastModifiedDate',
      'Contact__r.CreatedDate',
      'Contact__r.ReDI_Age__c',
    ],
  }
}
