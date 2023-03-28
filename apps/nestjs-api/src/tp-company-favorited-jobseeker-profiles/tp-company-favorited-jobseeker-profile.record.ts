import { Record, RecordMetadata } from '@talent-connect/common-types'
import { TpCompanyFavoritedJobseekerProfileRecordProps } from './tp-company-favorited-jobseeker-profile.recordprops'

export class TpCompanyFavoritedJobseekerProfileRecord extends Record<TpCompanyFavoritedJobseekerProfileRecordProps> {
  props: TpCompanyFavoritedJobseekerProfileRecordProps

  private constructor(props: TpCompanyFavoritedJobseekerProfileRecordProps) {
    super(props)
  }

  public static create(
    rawProps: TpCompanyFavoritedJobseekerProfileRecordProps
  ) {
    const props = TpCompanyFavoritedJobseekerProfileRecordProps.create(rawProps)
    return new TpCompanyFavoritedJobseekerProfileRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Company_Favorited_Jobseeker_Profile__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Account__c',
      'Favorited_Jobseeker_Profile__c',
      'CreatedDate',
      'LastModifiedDate',
    ],
  }
}
