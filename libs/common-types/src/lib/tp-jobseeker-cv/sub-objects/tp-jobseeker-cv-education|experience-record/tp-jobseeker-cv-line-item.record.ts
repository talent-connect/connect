import { Record, RecordMetadata } from '../../../base-interfaces-types-classes'
import { TpJobseekerCvLineItemRecordProps } from './tp-jobseeker-cv-line-item.recordprops'

export class TpJobseekerCvLineItemRecord extends Record<TpJobseekerCvLineItemRecordProps> {
  props: TpJobseekerCvLineItemRecordProps

  private constructor(props: TpJobseekerCvLineItemRecordProps) {
    super(props)
  }

  public static create(rawProps: TpJobseekerCvLineItemRecordProps) {
    const props = TpJobseekerCvLineItemRecordProps.create(rawProps)
    return new TpJobseekerCvLineItemRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Jobseeker_CV_Line_Item__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Jobseeker_CV__c',
      'RecordType.DeveloperName',
      'RecordTypeId',
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
      'CreatedDate',
      'LastModifiedDate',
    ],
    SALESFORCE_ORDER_BY: ['Frontend_View_Index__c', 'ASC'],
  }
}
