import { Injectable } from '@nestjs/common'
import { Mapper } from '../../base-interfaces-types-classes'
import {
  FederalState,
  ImmigrationStatus,
  TpDesiredPosition,
  TpEmploymentType,
  TpTechnicalSkill,
} from '../../common-objects'
import { TpAvailabilityOption } from '../../tp-common-objects'
import { JobseekerProfileStatus } from '../enums'
import { TpJobseekerProfileEntity } from './tp-jobseeker-profile.entity'
import { TpJobseekerProfileEntityProps } from './tp-jobseeker-profile.entityprops'
import { TpJobseekerProfileRecord } from './tp-jobseeker-profile.record'
import { TpJobseekerProfileRecordProps } from './tp-jobseeker-profile.recordprops'

@Injectable()
export class TpJobseekerProfileMapper
  implements Mapper<TpJobseekerProfileEntity, TpJobseekerProfileRecord>
{
  fromPersistence(raw: TpJobseekerProfileRecord): TpJobseekerProfileEntity {
    const props = new TpJobseekerProfileEntityProps()

    props.id = raw.props.Id

    props.rediLocation = raw.props.ReDI_Location__c
    props.profileAvatarImageS3Key = raw.props.Avatar_Image_URL__c
    props.desiredPositions =
      (raw.props.Desired_Positions__c?.split(';') as TpDesiredPosition[]) ??
      undefined
    props.location = raw.props.Location__c
    props.desiredEmploymentType =
      (raw.props.Desired_Employment_Type__c?.split(
        ';'
      ) as TpEmploymentType[]) ?? undefined
    props.availability = raw.props.Availability__c as TpAvailabilityOption
    props.ifAvailabilityIsDate_date = raw.props.Availability_Date__c
    props.aboutYourself = raw.props.About_Yourself__c
    props.topSkills =
      (raw.props.Top_Skills__c?.split(';') as TpTechnicalSkill[]) ?? undefined
    props.state = raw.props.Profile_Status__c as JobseekerProfileStatus
    props.joinsMunich24SummerJobFair =
      raw.props.Joins_Munich_24_Summer_Job_Fair__c
    props.isProfileVisibleToCompanies = raw.props.Is_Visible_to_Companies__c
    props.federalState = raw.props.Federal_State__c as FederalState
    props.willingToRelocate = raw.props.Willing_to_Relocate__c
    props.immigrationStatus = raw.props.Immigration_Status__c as unknown as
      | ImmigrationStatus
      | undefined

    props.userId = raw.props.Contact__c

    props.updatedAt = raw.props.LastModifiedDate
    props.createdAt = raw.props.CreatedDate

    const entity = TpJobseekerProfileEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpJobseekerProfileEntity
  ): TpJobseekerProfileRecord {
    const props = new TpJobseekerProfileRecordProps()

    props.Id = source.props.id

    props.ReDI_Location__c = source.props.rediLocation
    props.Avatar_Image_URL__c = source.props.profileAvatarImageS3Key
    props.Desired_Positions__c = source.props?.desiredPositions?.join(';')
    props.Location__c = source.props.location
    props.Desired_Employment_Type__c =
      source.props.desiredEmploymentType?.join(';')
    props.Availability__c = source.props.availability
    props.Availability_Date__c = source.props.ifAvailabilityIsDate_date
    props.About_Yourself__c = source.props.aboutYourself
    props.Top_Skills__c = source.props?.topSkills?.join(';')
    props.Profile_Status__c = source.props.state
    props.Joins_Munich_24_Summer_Job_Fair__c =
      source.props.joinsMunich24SummerJobFair
    props.Is_Visible_to_Companies__c = source.props.isProfileVisibleToCompanies
    props.Federal_State__c = source.props.federalState
    props.Willing_to_Relocate__c = source.props.willingToRelocate
    props.Immigration_Status__c = source.props.immigrationStatus as unknown as
      | string

    props.Contact__c = source.props.userId

    const record = TpJobseekerProfileRecord.create(props)

    return record
  }
}
