import { Injectable } from '@nestjs/common'
import { Mapper } from '@talent-connect/common-types'
import { TpCompanyFavoritedJobseekerProfileEntity } from '../tp-company-favorited-jobseeker-profile.entity'
import { TpCompanyFavoritedJobseekerProfileEntityProps } from '../tp-company-favorited-jobseeker-profile.entityprops'
import { TpCompanyFavoritedJobseekerProfileRecord } from '../tp-company-favorited-jobseeker-profile.record'
import { TpCompanyFavoritedJobseekerProfileRecordProps } from '../tp-company-favorited-jobseeker-profile.recordprops'

@Injectable()
export class TpCompanyFavoritedJobseekerProfileMapper
  implements
    Mapper<
      TpCompanyFavoritedJobseekerProfileEntity,
      TpCompanyFavoritedJobseekerProfileRecord
    >
{
  fromPersistence(
    raw: TpCompanyFavoritedJobseekerProfileRecord
  ): TpCompanyFavoritedJobseekerProfileEntity {
    const props = new TpCompanyFavoritedJobseekerProfileEntityProps()

    props.id = raw.props.Id
    props.tpCompanyProfileId = raw.props.Account__c
    props.favoritedTpJobseekerProfileId =
      raw.props.Favorited_Jobseeker_Profile__c
    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    const entity = TpCompanyFavoritedJobseekerProfileEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpCompanyFavoritedJobseekerProfileEntity
  ): TpCompanyFavoritedJobseekerProfileRecord {
    const props = new TpCompanyFavoritedJobseekerProfileRecordProps()
    const srcProps = source.props

    props.Id = srcProps.id
    props.Account__c = srcProps.tpCompanyProfileId
    props.Favorited_Jobseeker_Profile__c =
      srcProps.favoritedTpJobseekerProfileId

    const record = TpCompanyFavoritedJobseekerProfileRecord.create(props)

    return record
  }
}
