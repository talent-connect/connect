import { Record, RecordMetadata } from '@talent-connect/common-types'
import { TpJobseekerFavoritedJobListingRecordProps } from './tp-jobseeker-favorited-job-listing.recordprops'

export class TpJobseekerFavoritedJobListingRecord extends Record<TpJobseekerFavoritedJobListingRecordProps> {
  props: TpJobseekerFavoritedJobListingRecordProps

  private constructor(props: TpJobseekerFavoritedJobListingRecordProps) {
    super(props)
  }

  public static create(rawProps: TpJobseekerFavoritedJobListingRecordProps) {
    const props = TpJobseekerFavoritedJobListingRecordProps.create(rawProps)
    return new TpJobseekerFavoritedJobListingRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Jobseeker_Favorited_Job_Listing__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Jobseeker_Profile__c',
      'Job_Listing__c',
      'CreatedDate',
      'LastModifiedDate',
    ],
  }
}
