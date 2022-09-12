import { Injectable } from '@nestjs/common'
import { Mapper } from '../base-interfaces-types-classes'
import { ContactRecordProps } from '../common-objects'
import {
  FederalState,
  JobseekerProfileStatus,
  TpAvailabilityOption,
  TpDesiredEmploymentType,
  TpDesiredPosition,
  TpTechnicalSkill,
} from './enums'
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

    // Properties on SF Contact object
    props.id = raw.props.Id
    props.userId = raw.props.Contact__r.Id
    props.email = raw.props.Contact__r.ReDI_Email_Address__c
    props.firstName = String(raw.props.Contact__r.FirstName)
    props.lastName = raw.props.Contact__r.LastName
    props.linkedInUrl = raw.props.Contact__r.LinkedIn_Profile__c
    props.personalWebsite = raw.props.Contact__r.ReDI_Website_Portfolio__c
    props.githubUrl = raw.props.Contact__r.ReDI_GitHub_Profile__c
    props.behanceUrl = raw.props.Contact__r.ReDI_Behance_URL__c
    props.dribbbleUrl = raw.props.Contact__r.ReDI_Dribbble_URL__c
    props.stackOverflowUrl = raw.props.Contact__r.ReDI_Stack_Overflow_URL__c
    props.postalMailingAddress = raw.props.Contact__r.CON_TP_Mailing_Address__c
    props.telephoneNumber = raw.props.Contact__r.MobilePhone
    props.genderPronouns = raw.props.Contact__r.ReDI_Gender_Pronouns__c
    props.loopbackUserId = raw.props.Contact__r.Loopback_User_ID__c

    // Properties on SF Jobseeker Profile object
    props.rediLocation = raw.props.ReDI_Location__c
    props.currentlyEnrolledInCourse = raw.props.ReDI_Course__c
    props.profileAvatarImageS3Key = raw.props.Avatar_Image_URL__c
    props.desiredPositions =
      (raw.props.Desired_Positions__c?.split(';') as TpDesiredPosition[]) ??
      undefined
    props.location = raw.props.Location__c
    props.desiredEmploymentType =
      (raw.props.Desired_Employment_Type__c?.split(
        ';'
      ) as TpDesiredEmploymentType[]) ?? undefined
    props.availability = raw.props.Availability__c as TpAvailabilityOption
    props.ifAvailabilityIsDate_date = raw.props.Availability_Date__c
    props.aboutYourself = raw.props.About_Yourself__c
    props.topSkills =
      (raw.props.Top_Skills__c?.split(';') as TpTechnicalSkill[]) ?? undefined
    props.state = raw.props.Profile_Status__c as JobseekerProfileStatus
    props.isJobFair2022Participant = raw.props.Is_Job_Fair_2022_Participant__c
    props.isProfileVisibleToCompanies = raw.props.Is_Visible_to_Companies__c
    props.isHired = raw.props.Is_Hired__c
    props.federalState = raw.props.Federal_State__c as FederalState
    props.willingToRelocate = raw.props.Willing_to_Relocate__c

    props.updatedAt = raw.props.LastModifiedDate
    props.createdAt = raw.props.CreatedDate

    // The next ones are computed fields in Salesforce
    props.fullName = raw.props.Contact__r.Name

    const entity = TpJobseekerProfileEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpJobseekerProfileEntity
  ): TpJobseekerProfileRecord {
    const props = new TpJobseekerProfileRecordProps()
    const srcProps = source.props

    const Contact__r = new ContactRecordProps()
    Contact__r.Id = srcProps.id
    Contact__r.Id = srcProps.userId
    Contact__r.ReDI_Email_Address__c = srcProps.email
    Contact__r.FirstName = srcProps.firstName
    Contact__r.LastName = srcProps.lastName
    Contact__r.ReDI_Website_Portfolio__c = srcProps.personalWebsite
    Contact__r.LinkedIn_Profile__c = srcProps.linkedInUrl
    Contact__r.ReDI_GitHub_Profile__c = srcProps.githubUrl
    Contact__r.ReDI_Behance_URL__c = srcProps.behanceUrl
    Contact__r.ReDI_Dribbble_URL__c = srcProps.dribbbleUrl
    Contact__r.ReDI_Stack_Overflow_URL__c = srcProps.stackOverflowUrl
    Contact__r.CON_TP_Mailing_Address__c = srcProps.postalMailingAddress
    Contact__r.MobilePhone = srcProps.telephoneNumber
    Contact__r.ReDI_Gender_Pronouns__c = srcProps.genderPronouns
    Contact__r.Loopback_User_ID__c = srcProps.loopbackUserId

    props.Contact__r = Contact__r

    props.ReDI_Location__c = srcProps.rediLocation
    props.ReDI_Course__c = srcProps.currentlyEnrolledInCourse
    props.Avatar_Image_URL__c = srcProps.profileAvatarImageS3Key
    props.Desired_Positions__c = srcProps.desiredPositions?.join(';')
    props.Location__c = srcProps.location
    props.Desired_Employment_Type__c = srcProps.desiredEmploymentType?.join(';')
    props.Availability__c = srcProps.availability
    props.Availability_Date__c = srcProps.ifAvailabilityIsDate_date
    props.About_Yourself__c = srcProps.aboutYourself
    props.Top_Skills__c = srcProps.topSkills?.join(';')
    props.Profile_Status__c = srcProps.state
    props.Is_Job_Fair_2022_Participant__c = srcProps.isJobFair2022Participant
    props.Is_Visible_to_Companies__c = srcProps.isProfileVisibleToCompanies
    props.Is_Hired__c = srcProps.isHired
    props.Federal_State__c = srcProps.federalState
    props.Willing_to_Relocate__c = srcProps.willingToRelocate

    const record = TpJobseekerProfileRecord.create(props)

    return record
  }
}
