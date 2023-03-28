import { Injectable } from '@nestjs/common'
import { Mapper } from '@talent-connect/common-types'
import { TpJobseekerFavoritedJobListingEntity } from '../tp-jobseeker-favorited-job-listing.entity'
import { TpJobseekerFavoritedJobListingEntityProps } from '../tp-jobseeker-favorited-job-listing.entityprops'
import { TpJobseekerFavoritedJobListingRecord } from '../tp-jobseeker-favorited-job-listing.record'
import { TpJobseekerFavoritedJobListingRecordProps } from '../tp-jobseeker-favorited-job-listing.recordprops'

@Injectable()
export class TpJobseekerFavoritedJobListingMapper
  implements
    Mapper<
      TpJobseekerFavoritedJobListingEntity,
      TpJobseekerFavoritedJobListingRecord
    >
{
  fromPersistence(
    raw: TpJobseekerFavoritedJobListingRecord
  ): TpJobseekerFavoritedJobListingEntity {
    const props = new TpJobseekerFavoritedJobListingEntityProps()

    props.id = raw.props.Id
    props.tpJobseekerProfileId = raw.props.Jobseeker_Profile__c
    props.tpJobListingId = raw.props.Job_Listing__c
    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    const entity = TpJobseekerFavoritedJobListingEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpJobseekerFavoritedJobListingEntity
  ): TpJobseekerFavoritedJobListingRecord {
    const props = new TpJobseekerFavoritedJobListingRecordProps()
    const srcProps = source.props

    props.Id = srcProps.id
    props.Jobseeker_Profile__c = srcProps.tpJobseekerProfileId
    props.Job_Listing__c = srcProps.tpJobListingId

    const record = TpJobseekerFavoritedJobListingRecord.create(props)

    return record
  }
}
