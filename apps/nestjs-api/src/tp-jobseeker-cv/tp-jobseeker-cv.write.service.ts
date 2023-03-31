import { Injectable } from '@nestjs/common'
import {
  TpJobseekerCvEducationRecordEntity,
  TpJobseekerCvEducationRecordEntityProps,
  TpJobseekerCvEntity,
  TpJobseekerCvEntityProps,
  TpJobseekerCvExperienceRecordEntity,
  TpJobseekerCvExperienceRecordEntityProps,
  TpJobseekerCvLanguageRecordEntity,
  TpJobseekerCvLanguageRecordEntityProps,
  TpJobseekerCvMapper,
  TpJobseekerProfileEducationRecordEntity,
  TpJobseekerProfileEntity,
  TpJobseekerProfileExperienceRecordEntity,
  TpJobseekerProfileLanguageRecordEntity,
  UserContactEntity,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiTpJobseekerCvService } from '../salesforce-api/sf-api-tp-jobseeker-cv.service'
import { TpJobseekerProfileEducationRecordsService } from '../tp-jobseeker-profile-education-records/tp-jobseeker-profile-education-records.service'
import { TpJobseekerProfileExperienceRecordsService } from '../tp-jobseeker-profile-experience-records/tp-jobseeker-profile-experience-records.service'
import { TpJobseekerProfileLanguageRecordsService } from '../tp-jobseeker-profile-language-records/tp-jobseeker-profile-language-records.service'
import { TpJobseekerProfileService } from '../tp-jobseeker-profile/tp-jobseeker-profile.service'
import { TpJobseekerCvCreateInput } from './dto/tp-jobseeker-cv-create.entityinput'
import { TpJobseekerCvDeleteInput } from './dto/tp-jobseeker-cv-delete.entityinput'
import { TpJobseekerCvPatchInput } from './dto/tp-jobseeker-cv-patch.entityinput'
import { TpJobseekerCvEducationRecordsService } from './tp-jobseeker-cv-education-records/tp-jobseeker-cv-education-records.service'
import { TpJobseekerCvExperienceRecordsService } from './tp-jobseeker-cv-experience-records/tp-jobseeker-cv-experience-records.service'
import { TpJobseekerCvLanguageRecordsService } from './tp-jobseeker-cv-language-records/tp-jobseeker-cv-language-records.service'
import { TpJobseekerCvReadService } from './tp-jobseeker-cv.read.service'

@Injectable()
export class TpJobseekerCvWriteService {
  constructor(
    private readonly api: SfApiTpJobseekerCvService,
    private readonly tpJobseekerCvReadService: TpJobseekerCvReadService,
    private readonly tpJobseekerProfileService: TpJobseekerProfileService,
    private readonly tpJobseekerProfileEducationRecordsService: TpJobseekerProfileEducationRecordsService,
    private readonly tpJobseekerProfileExperienceRecordsService: TpJobseekerProfileExperienceRecordsService,
    private readonly tpJobseekerProfileLanguageRecordsService: TpJobseekerProfileLanguageRecordsService,
    private readonly tpJobseekerCvEducationRecordsService: TpJobseekerCvEducationRecordsService,
    private readonly tpJobseekerCvExperienceRecordsService: TpJobseekerCvExperienceRecordsService,
    private readonly tpJobseekerCvLanguageRecordsService: TpJobseekerCvLanguageRecordsService,
    private readonly mapper: TpJobseekerCvMapper
  ) {}

  async create(input: TpJobseekerCvCreateInput, currentUser: CurrentUserInfo) {
    const props = new TpJobseekerCvEntityProps()
    Object.assign(props, input)
    props.userId = currentUser.userId

    const entityToPersist = TpJobseekerCvEntity.create(props)
    return await this.api.create(this.mapper.toPersistence(entityToPersist))
  }

  async createFromCurrentUserJobseekerProfile(input, currentUser) {
    const currentUserProfile =
      await this.tpJobseekerProfileService.findOneByUserId(currentUser.userId)
    const newCv = tpJobseekerProfileToTpJobseekerCv(
      UserContactEntity.create(currentUser.userProps),
      currentUserProfile
    )
    newCv.props.cvName = input.cvName
    const newCvSaveResult = await this.api.create(
      this.mapper.toPersistence(newCv)
    )

    const profileRecordsPromises = [
      this.tpJobseekerProfileEducationRecordsService.findAll({
        Jobseeker_Profile__c: currentUserProfile.props.id,
      }),
      this.tpJobseekerProfileExperienceRecordsService.findAll({
        Jobseeker_Profile__c: currentUserProfile.props.id,
      }),
      this.tpJobseekerProfileLanguageRecordsService.findAll({
        hed__Contact__c: currentUser.userId,
      }),
    ]

    const [
      profileEducationRecords,
      profileExperienceRecords,
      profileLanguageRecords,
    ] = await Promise.all(profileRecordsPromises)

    const newCvRecords = [
      ...(
        profileEducationRecords as TpJobseekerProfileEducationRecordEntity[]
      ).map(tpJobseekerProfileEducationRecordToTpJobseekerCvEducationRecord),
      ...(
        profileExperienceRecords as TpJobseekerProfileExperienceRecordEntity[]
      ).map(tpJobseekerProfileExperienceRecordToTpJobseekerCvExperienceRecord),
      ...(
        profileLanguageRecords as TpJobseekerProfileLanguageRecordEntity[]
      ).map(tpJobseekerProfileLanguageRecordToTpJobseekerCvLanguageRecord),
    ].map((record) => {
      record.props.tpJobseekerCvId = newCvSaveResult.id
      return record
    })

    const newCvRecordsSaveResultsPromises = newCvRecords.map((record) => {
      if (record instanceof TpJobseekerCvEducationRecordEntity) {
        return this.tpJobseekerCvEducationRecordsService.create(record)
      } else if (record instanceof TpJobseekerCvExperienceRecordEntity) {
        return this.tpJobseekerCvExperienceRecordsService.create(record)
      } else if (record instanceof TpJobseekerCvLanguageRecordEntity) {
        return this.tpJobseekerCvLanguageRecordsService.create(record)
      }
    })

    await Promise.all(newCvRecordsSaveResultsPromises)

    return newCvSaveResult
  }

  async patch(input: TpJobseekerCvPatchInput, currentUser: CurrentUserInfo) {
    const existingEntity = await this.tpJobseekerCvReadService.findOneByUserId(
      currentUser.userId
    )
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = TpJobseekerCvEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }

  async delete(input: TpJobseekerCvDeleteInput) {
    const existingEntity = await this.tpJobseekerCvReadService.findOne(input.id)
    const recordToDelete = this.mapper.toPersistence(existingEntity)
    await this.api.delete(recordToDelete)
  }
}

function tpJobseekerProfileToTpJobseekerCv(
  userContact: UserContactEntity,
  jobseekerProfile: TpJobseekerProfileEntity
) {
  const props = new TpJobseekerCvEntityProps()
  props.aboutYourself = jobseekerProfile.props.aboutYourself
  props.availability = jobseekerProfile.props.availability
  props.behanceUrl = userContact.props.behanceUrl
  props.desiredEmploymentType = jobseekerProfile.props.desiredEmploymentType
  props.desiredPositions = jobseekerProfile.props.desiredPositions
  props.dribbbleUrl = userContact.props.dribbbleUrl
  props.email = userContact.props.email
  props.firstName = userContact.props.firstName
  props.githubUrl = userContact.props.githubProfileUrl
  props.ifAvailabilityIsDate_date =
    jobseekerProfile.props.ifAvailabilityIsDate_date
  props.immigrationStatus = jobseekerProfile.props.immigrationStatus
  props.lastName = userContact.props.lastName
  props.linkedInUrl = userContact.props.linkedInProfileUrl
  props.location = jobseekerProfile.props.location
  props.personalWebsite = userContact.props.personalWebsite
  props.postalMailingAddress = userContact.props.postalMailingAddress
  props.profileAvatarImageS3Key = jobseekerProfile.props.profileAvatarImageS3Key
  props.stackOverflowUrl = userContact.props.stackOverflowUrl
  props.telephoneNumber = userContact.props.telephoneNumber
  props.topSkills = jobseekerProfile.props.topSkills
  props.twitterUrl = userContact.props.twitterUrl
  props.userId = userContact.props.id
  props.willingToRelocate = jobseekerProfile.props.willingToRelocate

  return TpJobseekerCvEntity.create(props)
}
function tpJobseekerProfileEducationRecordToTpJobseekerCvEducationRecord(
  input: TpJobseekerProfileEducationRecordEntity
) {
  const props = new TpJobseekerCvEducationRecordEntityProps()
  props.certificationType = input.props.certificationType
  props.current = input.props.current
  props.description = input.props.description
  props.endDateMonth = input.props.endDateMonth
  props.endDateYear = input.props.endDateYear
  props.institutionCity = input.props.institutionCity
  props.institutionCountry = input.props.institutionCountry
  props.institutionName = input.props.institutionName
  props.sortIndex = input.props.sortIndex
  props.startDateMonth = input.props.startDateMonth
  props.startDateYear = input.props.startDateYear
  props.title = input.props.title

  return TpJobseekerCvEducationRecordEntity.create(props)
}
function tpJobseekerProfileExperienceRecordToTpJobseekerCvExperienceRecord(
  input: TpJobseekerProfileExperienceRecordEntity
) {
  const props = new TpJobseekerCvExperienceRecordEntityProps()
  props.city = input.props.city
  props.company = input.props.company
  props.country = input.props.country
  props.current = input.props.current
  props.description = input.props.description
  props.endDateMonth = input.props.endDateMonth
  props.endDateYear = input.props.endDateYear
  props.sortIndex = input.props.sortIndex
  props.startDateMonth = input.props.startDateMonth
  props.startDateYear = input.props.startDateYear
  props.title = input.props.title

  return TpJobseekerCvExperienceRecordEntity.create(props)
}
function tpJobseekerProfileLanguageRecordToTpJobseekerCvLanguageRecord(
  input: TpJobseekerProfileLanguageRecordEntity
) {
  const props = new TpJobseekerCvLanguageRecordEntityProps()
  props.language = input.props.language
  props.proficiencyLevelId = input.props.proficiencyLevelId

  return TpJobseekerCvLanguageRecordEntity.create(props)
}
