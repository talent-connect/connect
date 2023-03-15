import { Injectable, NotFoundException } from '@nestjs/common'
import {
  TpJobseekerProfileEducationRecordEntity,
  TpJobseekerProfileEducationRecordEntityProps,
  TpJobseekerProfileEducationRecordMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiTpJobseekerProfileEducationRecordsService } from '../salesforce-api/sf-api-tp-jobseeker-profile-education-records.service'
import { TpJobseekerProfileService } from '../tp-jobseeker-profile/tp-jobseeker-profile.service'
import { TpJobseekerProfileEducationRecordCreateInput } from './dtos/tp-jobseeker-profile-education-record-create.entityinput'
import { TpJobseekerProfileEducationRecordDeleteInput } from './dtos/tp-jobseeker-profile-education-record-delete.entityinput'
import { TpJobseekerProfileEducationRecordPatchInput } from './dtos/tp-jobseeker-profile-education-record-patch.entityinput'

@Injectable()
export class TpJobseekerProfileEducationRecordsService {
  constructor(
    private readonly api: SfApiTpJobseekerProfileEducationRecordsService,
    private readonly mapper: TpJobseekerProfileEducationRecordMapper,
    private readonly tpJobseekerProfileService: TpJobseekerProfileService
  ) {}

  async findAll(filter: any = {}) {
    const records =
      await this.api.getAllJobseekerLineItemsWithRecordTypeEducation(filter)

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
      throw new NotFoundException('TpJobseekerProfile not found with id: ' + id)
    }
  }

  async create(
    input: TpJobseekerProfileEducationRecordCreateInput,
    user: CurrentUserInfo
  ) {
    const props = new TpJobseekerProfileEducationRecordEntityProps()
    Object.assign(props, input)

    const currentUserJobseekerProfile =
      await this.tpJobseekerProfileService.findOneByUserId(user.userId)

    props.userId = user.userId
    props.tpJobseekerProfileId = currentUserJobseekerProfile.props.id

    const entityToPersist =
      TpJobseekerProfileEducationRecordEntity.create(props)
    const recordToPersist = this.mapper.toPersistence(entityToPersist)

    return await this.api.create(recordToPersist)
  }

  async patch(input: TpJobseekerProfileEducationRecordPatchInput) {
    const existingEntity = await this.findOne(input.id)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist =
      TpJobseekerProfileEducationRecordEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }

  async delete(input: TpJobseekerProfileEducationRecordDeleteInput) {
    const existingEntity = await this.findOne(input.id)
    const recordToDelete = this.mapper.toPersistence(existingEntity)
    await this.api.delete(recordToDelete)
  }
}
