import { Record, RecordMetadata } from '../base-interfaces-types-classes'
import { TpJobseekerCvRecordProps } from './tp-jobseeker-cv.recordprops'

export class TpJobseekerCvRecord extends Record<TpJobseekerCvRecordProps> {
  props: TpJobseekerCvRecordProps

  private constructor(props: TpJobseekerCvRecordProps) {
    super(props)
  }

  public static create(rawProps: TpJobseekerCvRecordProps) {
    const props = TpJobseekerCvRecordProps.create(rawProps)
    return new TpJobseekerCvRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Jobseeker_CV__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'About_Yourself__c',
      'Availability__c',
      'Availability_Date__c',
      'Avatar_Image_URL__c',
      'Behance_URL__c',
      'Contact__c',
      'Desired_Employment_Type__c',
      'Desired_Positions__c',
      'Dribbble_URL__c',
      'Email__c',
      'First_Name__c',
      'GitHub_URL__c',
      'Immigration_Status__c',
      'Name',
      'Last_Name__c',
      'LinkedIn_URL__c',
      'Location__c',
      'Phone_Number__c',
      'Mailing_Address__c',
      'Stack_Overflow_URL__c',
      'Top_Skills__c',
      'Twitter_URL__c',
      'Website_Portfolio__c',
      'Willing_to_Relocate__c',
      'CreatedDate',
      'LastModifiedDate',
    ],
    SALESFORCE_ORDER_BY: ['CreatedDate', 'DESC'],
  }
}
