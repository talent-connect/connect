import {
  Record,
  RecordMetadata,
} from '../../../../base-interfaces-types-classes'
import { TpJobseekerLineItemRecordProps } from './tp-jobseeker-line-item.recordprops'

export class TpJobseekerLineItemRecord extends Record<TpJobseekerLineItemRecordProps> {
  props: TpJobseekerLineItemRecordProps

  private constructor(props: TpJobseekerLineItemRecordProps) {
    super(props)
  }

  public static create(rawProps: TpJobseekerLineItemRecordProps) {
    const props = TpJobseekerLineItemRecordProps.create(rawProps)
    return new TpJobseekerLineItemRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Jobseeker_Line_Item__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Contact__c',
      'Jobseeker_Profile__c',
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
      'CreatedDate',
      'LastModifiedDate',
    ],
  }
}
