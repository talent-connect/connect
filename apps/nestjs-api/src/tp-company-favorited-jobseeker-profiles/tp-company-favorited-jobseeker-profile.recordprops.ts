import { RecordProps } from '@talent-connect/common-types'
import { plainToClass, Type } from 'class-transformer'

export class TpCompanyFavoritedJobseekerProfileRecordProps
  implements RecordProps
{
  Id: string

  Account__c: string
  Favorited_Jobseeker_Profile__c: string

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  public static create(rawProps: any) {
    return plainToClass(
      TpCompanyFavoritedJobseekerProfileRecordProps,
      rawProps,
      {}
    )
  }
}
