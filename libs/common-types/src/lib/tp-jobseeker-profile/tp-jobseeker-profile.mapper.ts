import { Injectable } from '@nestjs/common'
import { Mapper } from '../base-interfaces-types-classes'
import {
  ContactRecordProps,
  Language,
  LanguageProficiencyLevel,
} from '../common-objects'
import {
  FederalState,
  JobseekerProfileStatus,
  TpAvailabilityOption,
  TpDesiredEmploymentType,
  TpDesiredPosition,
  TpTechnicalSkill,
} from './enums'
import { TpJobseekerProfileEntity } from './tp-jobseeker-profile.entity'
import {
  EducationRecord,
  ExperienceRecord,
  LanguageRecord,
  TpJobseekerProfileEntityProps,
} from './tp-jobseeker-profile.entityprops'
import { TpJobseekerProfileRecord } from './tp-jobseeker-profile.record'
import { TpJobseekerProfileRecordProps } from './tp-jobseeker-profile.recordprops'

@Injectable()
export class TpJobseekerProfileMapper
  implements Mapper<TpJobseekerProfileEntity, TpJobseekerProfileRecord>
{
  fromPersistence(raw: TpJobseekerProfileRecord): TpJobseekerProfileEntity {
    const props = new TpJobseekerProfileEntityProps()

    // Properties on SF Contact object
    props.userId = raw.props.Id
    props.email = raw.props.ReDI_Email_Address__c
    props.firstName = String(raw.props.FirstName)
    props.lastName = raw.props.LastName
    props.linkedInUrl = raw.props.LinkedIn_Profile__c
    props.personalWebsite = raw.props.ReDI_Website_Portfolio__c
    props.githubUrl = raw.props.ReDI_GitHub_Profile__c
    props.behanceUrl = raw.props.ReDI_Behance_URL__c
    props.dribbbleUrl = raw.props.ReDI_Dribbble_URL__c
    props.stackOverflowUrl = raw.props.ReDI_Stack_Overflow_URL__c
    props.postalMailingAddress = raw.props.CON_TP_Mailing_Address__c
    props.telephoneNumber = raw.props.MobilePhone
    props.genderPronouns = raw.props.ReDI_Gender_Pronouns__c
    props.loopbackUserId = raw.props.Loopback_User_ID__c

    // Properties on SF Jobseeker Profile object
    const jobseekerProfileRecord = raw.props.Jobseeker_Profiles__r.records[0]

    props.id = jobseekerProfileRecord.Id

    props.rediLocation = jobseekerProfileRecord.ReDI_Location__c
    props.currentlyEnrolledInCourse = jobseekerProfileRecord.ReDI_Course__c
    props.profileAvatarImageS3Key = jobseekerProfileRecord.Avatar_Image_URL__c
    props.desiredPositions =
      (jobseekerProfileRecord.Desired_Positions__c?.split(
        ';'
      ) as TpDesiredPosition[]) ?? undefined
    props.location = jobseekerProfileRecord.Location__c
    props.desiredEmploymentType =
      (jobseekerProfileRecord.Desired_Employment_Type__c?.split(
        ';'
      ) as TpDesiredEmploymentType[]) ?? undefined
    props.availability =
      jobseekerProfileRecord.Availability__c as TpAvailabilityOption
    props.ifAvailabilityIsDate_date =
      jobseekerProfileRecord.Availability_Date__c
    props.aboutYourself = jobseekerProfileRecord.About_Yourself__c
    props.topSkills =
      (jobseekerProfileRecord.Top_Skills__c?.split(
        ';'
      ) as TpTechnicalSkill[]) ?? undefined
    props.state =
      jobseekerProfileRecord.Profile_Status__c as JobseekerProfileStatus
    props.isJobFair2022Participant =
      jobseekerProfileRecord.Is_Job_Fair_2022_Participant__c
    props.isProfileVisibleToCompanies =
      jobseekerProfileRecord.Is_Visible_to_Companies__c
    props.isHired = jobseekerProfileRecord.Is_Hired__c
    props.federalState = jobseekerProfileRecord.Federal_State__c as FederalState
    props.willingToRelocate = jobseekerProfileRecord.Willing_to_Relocate__c

    props.updatedAt = jobseekerProfileRecord.LastModifiedDate
    props.createdAt = jobseekerProfileRecord.CreatedDate

    // Handling any (if any) child Lineseeker objects
    props.experience = []
    props.education = []
    if (raw.props.Jobseeker_Line_Items__r?.records?.length) {
      const records = raw.props.Jobseeker_Line_Items__r?.records
      for (let i = 0; i < records.length; i++) {
        const record = records[i]
        let baseRecord = {} as ExperienceRecord | EducationRecord
        baseRecord.uuid = String(record.Frontend_View_Index__c)
        baseRecord.title = record.Title__c
        baseRecord.description = record.Description__c
        baseRecord.startDateMonth = record.Start_Date_Month__c
        baseRecord.startDateYear = record.Start_Date_Year__c
        baseRecord.endDateMonth = record.End_Date_Month__c
        baseRecord.endDateYear = record.End_Date_Year__c
        baseRecord.current = record.Current__c
        if (record.RecordType.DeveloperName === 'Education') {
          const educationRecord = baseRecord as EducationRecord
          educationRecord.institutionCity = record.Institution_City__c
          educationRecord.institutionCountry = record.Institution_Country__c
          educationRecord.institutionName = record.Institution_Name__c
          educationRecord.certificationType = record.Certification_Type__c
          props.education.push(educationRecord)
        } else if (record.RecordType.DeveloperName === 'Experience') {
          const experienceRecord = baseRecord as ExperienceRecord
          experienceRecord.city = record.City__c
          experienceRecord.country = record.Country__c
          experienceRecord.company = record.Company__c
          props.experience.push(experienceRecord)
        } else {
          throw new Error(
            '[TpJobseekerProfileMapper] Unknown Jobseeker_Line_Item__c RecordType'
          )
        }
      }
    }

    // Handling any (if any) child Contact Language objects
    props.workingLanguages = []
    if (raw.props.hed__Contact_Languages__r?.records?.length) {
      const records = raw.props.hed__Contact_Languages__r?.records
      for (let i = 0; i < records.length; i++) {
        const record = records[i]
        const workingLanguage: LanguageRecord = {
          language: record.hed__Language__r.Slug__c as Language,
          proficiencyLevelId:
            record.hed__Fluency__c as LanguageProficiencyLevel,
        }
        props.workingLanguages.push(workingLanguage)
      }
    }

    // The next ones are computed fields in Salesforce
    props.fullName = raw.props.Name

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

    // props.Contact__r = Contact__r

    // props.ReDI_Location__c = srcProps.rediLocation
    // props.ReDI_Course__c = srcProps.currentlyEnrolledInCourse
    // props.Avatar_Image_URL__c = srcProps.profileAvatarImageS3Key
    // props.Desired_Positions__c = srcProps.desiredPositions?.join(';')
    // props.Location__c = srcProps.location
    // props.Desired_Employment_Type__c = srcProps.desiredEmploymentType?.join(';')
    // props.Availability__c = srcProps.availability
    // props.Availability_Date__c = srcProps.ifAvailabilityIsDate_date
    // props.About_Yourself__c = srcProps.aboutYourself
    // props.Top_Skills__c = srcProps.topSkills?.join(';')
    // props.Profile_Status__c = srcProps.state
    // props.Is_Job_Fair_2022_Participant__c = srcProps.isJobFair2022Participant
    // props.Is_Visible_to_Companies__c = srcProps.isProfileVisibleToCompanies
    // props.Is_Hired__c = srcProps.isHired
    // props.Federal_State__c = srcProps.federalState
    // props.Willing_to_Relocate__c = srcProps.willingToRelocate

    const record = TpJobseekerProfileRecord.create(props)

    return record
  }
}
