import { Injectable } from '@nestjs/common'
import { Mapper } from '../base-interfaces-types-classes'
import {
  ImmigrationStatus,
  TpDesiredPosition,
  TpEmploymentType,
  TpTechnicalSkill,
} from '../common-objects'
import { TpAvailabilityOption } from '../tp-common-objects'
import { TpJobseekerCvEntity } from './tp-jobseeker-cv.entity'
import { TpJobseekerCvEntityProps } from './tp-jobseeker-cv.entityprops'
import { TpJobseekerCvRecord } from './tp-jobseeker-cv.record'
import { TpJobseekerCvRecordProps } from './tp-jobseeker-cv.recordprops'

@Injectable()
export class TpJobseekerCvMapper
  implements Mapper<TpJobseekerCvEntity, TpJobseekerCvRecord>
{
  fromPersistence(raw: TpJobseekerCvRecord): TpJobseekerCvEntity {
    const props = new TpJobseekerCvEntityProps()

    props.id = raw.props.Id
    props.aboutYourself = raw.props.About_Yourself__c
    props.availability =
      (raw.props.Availability__c as TpAvailabilityOption) ?? undefined
    props.ifAvailabilityIsDate_date = raw.props.Availability_Date__c
    props.profileAvatarImageS3Key = raw.props.Avatar_Image_URL__c
    props.behanceUrl = raw.props.Behance_URL__c
    props.userId = raw.props.Contact__c
    props.desiredEmploymentType =
      (raw.props.Desired_Employment_Type__c?.split(
        ';'
      ) as TpEmploymentType[]) ?? undefined
    props.desiredPositions =
      (raw.props.Desired_Positions__c?.split(';') as TpDesiredPosition[]) ??
      undefined
    props.dribbbleUrl = raw.props.Dribbble_URL__c
    props.email = raw.props.Email__c
    props.firstName = raw.props.First_Name__c
    props.githubUrl = raw.props.GitHub_URL__c
    props.immigrationStatus =
      (raw.props.Immigration_Status__c as ImmigrationStatus) ?? undefined
    props.cvName = raw.props.Name
    props.lastName = raw.props.Last_Name__c
    props.linkedInUrl = raw.props.LinkedIn_URL__c
    props.location = raw.props.Location__c
    props.postalMailingAddress = raw.props.Mailing_Address__c
    props.telephoneNumber = raw.props.Phone_Number__c
    props.stackOverflowUrl = raw.props.Stack_Overflow_URL__c
    props.topSkills =
      (raw.props.Top_Skills__c?.split(';') as TpTechnicalSkill[]) ?? undefined
    props.twitterUrl = raw.props.Twitter_URL__c
    props.personalWebsite = raw.props.Website_Portfolio__c
    props.willingToRelocate = Boolean(raw.props.Willing_to_Relocate__c)
    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    const entity = TpJobseekerCvEntity.create(props)

    return entity
  }

  public toPersistence(source: TpJobseekerCvEntity): TpJobseekerCvRecord {
    const props = new TpJobseekerCvRecordProps()

    props.Id = source.props.id
    props.About_Yourself__c = source.props.aboutYourself
    props.Availability__c = source.props.availability
    props.Availability_Date__c = source.props.ifAvailabilityIsDate_date
    props.Avatar_Image_URL__c = source.props.profileAvatarImageS3Key
    props.Behance_URL__c = source.props.behanceUrl
    props.Contact__c = source.props.userId
    props.Desired_Employment_Type__c =
      source.props.desiredEmploymentType?.join(';')
    props.Desired_Positions__c = source.props.desiredPositions?.join(';')
    props.Dribbble_URL__c = source.props.dribbbleUrl
    props.Email__c = source.props.email
    props.First_Name__c = source.props.firstName
    props.GitHub_URL__c = source.props.githubUrl
    props.Immigration_Status__c = source.props.immigrationStatus
    props.Name = source.props.cvName
    props.Last_Name__c = source.props.lastName
    props.LinkedIn_URL__c = source.props.linkedInUrl
    props.Location__c = source.props.location
    props.Mailing_Address__c = source.props.postalMailingAddress
    props.Phone_Number__c = source.props.telephoneNumber
    props.Stack_Overflow_URL__c = source.props.stackOverflowUrl
    props.Top_Skills__c = source.props.topSkills?.join(';')
    props.Twitter_URL__c = source.props.twitterUrl
    props.Website_Portfolio__c = source.props.personalWebsite
    props.Willing_to_Relocate__c = source.props.willingToRelocate ?? undefined
    props.CreatedDate = source.props.createdAt
    props.LastModifiedDate = source.props.updatedAt

    const record = TpJobseekerCvRecord.create(props)

    return record
  }
}
