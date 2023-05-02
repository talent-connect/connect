import { Record, RecordMetadata } from '../../../base-interfaces-types-classes'
import { TpJobseekerCvLanguageRecordProps } from './tp-jobseeker-cv-language.recordprops'

export class TpJobseekerCvLanguageRecord extends Record<TpJobseekerCvLanguageRecordProps> {
  props: TpJobseekerCvLanguageRecordProps

  private constructor(props: TpJobseekerCvLanguageRecordProps) {
    super(props)
  }

  public static create(rawProps: TpJobseekerCvLanguageRecordProps) {
    const props = TpJobseekerCvLanguageRecordProps.create(rawProps)
    return new TpJobseekerCvLanguageRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Jobseeker_CV_Language_Item__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Jobseeker_CV__c',
      'Fluency__c',
      'Language__c',
      'Language__r.Slug__c',
      'Jobseeker_CV_Contact__c',
      'CreatedDate',
      'LastModifiedDate',
    ],
    SALESFORCE_ORDER_BY: ['Language__r.Slug__c'],
  }
}
