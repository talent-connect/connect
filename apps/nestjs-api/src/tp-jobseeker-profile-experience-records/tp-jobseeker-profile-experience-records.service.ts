import { Injectable, NotFoundException } from '@nestjs/common'
import {
  TpJobseekerProfileExperienceRecordEntity,
  TpJobseekerProfileExperienceRecordEntityProps,
  TpJobseekerProfileExperienceRecordMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiTpJobseekerProfileExperienceRecordsService } from '../salesforce-api/sf-api-tp-jobseeker-profile-experience-records.service'
import { TpJobseekerProfileService } from '../tp-jobseeker-profile/tp-jobseeker-profile.service'
import { TpJobseekerProfileExperienceRecordCreateInput } from './dtos/tp-jobseeker-profile-experience-record-create.entityinput'
import { TpJobseekerProfileExperienceRecordDeleteInput } from './dtos/tp-jobseeker-profile-experience-record-delete.entityinput'
import { TpJobseekerProfileExperienceRecordPatchInput } from './dtos/tp-jobseeker-profile-experience-record-patch.entityinput'

@Injectable()
export class TpJobseekerProfileExperienceRecordsService {
  constructor(
    private readonly api: SfApiTpJobseekerProfileExperienceRecordsService,
    private readonly mapper: TpJobseekerProfileExperienceRecordMapper,
    private readonly tpJobseekerProfileService: TpJobseekerProfileService
  ) {}

  async findAll(filter: any = {}) {
    const records =
      await this.api.getAllJobseekerLineItemsWithRecordTypeExperience(filter)

    const entities = records.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findOne(id: string) {
    const entities = await this.findAll({
      Id: id,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException(
        'TpJobseekerProfileExperienceRecord not found with id: ' + id
      )
    }
  }

  async create(
    input: TpJobseekerProfileExperienceRecordCreateInput,
    user: CurrentUserInfo
  ) {
    const props = new TpJobseekerProfileExperienceRecordEntityProps()
    Object.assign(props, input)

    const currentUserJobseekerProfile =
      await this.tpJobseekerProfileService.findOneByUserId(user.userId)

    props.userId = user.userId
    props.tpJobseekerProfileId = currentUserJobseekerProfile.props.id

    const entityToPersist =
      TpJobseekerProfileExperienceRecordEntity.create(props)
    const recordToPersist = this.mapper.toPersistence(entityToPersist)

    return await this.api.create(recordToPersist)
  }

  async patch(input: TpJobseekerProfileExperienceRecordPatchInput) {
    const existingEntity = await this.findOne(input.id)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist =
      TpJobseekerProfileExperienceRecordEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }

  async delete(input: TpJobseekerProfileExperienceRecordDeleteInput) {
    const existingEntity = await this.findOne(input.id)
    const recordToDelete = this.mapper.toPersistence(existingEntity)
    await this.api.delete(recordToDelete)
  }
}
