import { RecordProps } from '@talent-connect/common-types'
import { plainToClass, Type } from 'class-transformer'

export class TpJobseekerFavoritedJobListingRecordProps implements RecordProps {
  Id: string

  Jobseeker_Profile__c: string
  Job_Listing__c: string

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  public static create(rawProps: any) {
    return plainToClass(TpJobseekerFavoritedJobListingRecordProps, rawProps, {})
  }
}
