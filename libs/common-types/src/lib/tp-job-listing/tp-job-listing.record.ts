import { Record, RecordMetadata } from '../base-interfaces-types-classes'
import { TpJobListingRecordProps } from './tp-job-listing.recordprops'

export class TpJobListingRecord extends Record<TpJobListingRecordProps> {
  props: TpJobListingRecordProps

  private constructor(props: TpJobListingRecordProps) {
    super(props)
  }

  public static create(rawProps: TpJobListingRecordProps) {
    const props = TpJobListingRecordProps.create(rawProps)
    return new TpJobListingRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Job_Listing__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'CreatedDate',
      'LastModifiedDate',
      'Expires_At__c',

      'Status__c',
      'Title__c',
      'Location__c',
      'Summary__c',
      'Ideal_Technical_Skills__c',
      'Relates_to_Positions__c',
      'Employment_Type__c',
      'Language_Requirements__c',
      'Salary_Range__c',
      'Remote_Possible__c',
      'Federal_State__c',

      'Account__c',
      'Account__r.Name',
      'Account__r.ReDI_Avatar_Image_URL__c',
      'Account__r.Career_Partner__c',
    ],
    SALESFORCE_ORDER_BY: ['LastModifiedDate', 'DESC'],
  }
}
