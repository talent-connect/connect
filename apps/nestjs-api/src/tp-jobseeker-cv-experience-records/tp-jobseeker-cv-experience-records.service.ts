import { Injectable, NotFoundException } from '@nestjs/common'
import {
  TpJobseekerCvExperienceRecordEntity,
  TpJobseekerCvExperienceRecordEntityProps,
  TpJobseekerCvExperienceRecordMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { SfApiTpJobseekerCvExperienceRecordsService } from '../salesforce-api/sf-api-tp-jobseeker-cv-experience-records.service'
import { TpJobseekerCvExperienceRecordCreateInput } from './dtos/tp-jobseeker-cv-experience-record-create.entityinput'
import { TpJobseekerCvExperienceRecordDeleteInput } from './dtos/tp-jobseeker-cv-experience-record-delete.entityinput'
import { TpJobseekerCvExperienceRecordPatchInput } from './dtos/tp-jobseeker-cv-experience-record-patch.entityinput'

@Injectable()
export class TpJobseekerCvExperienceRecordsService {
  constructor(
    private readonly api: SfApiTpJobseekerCvExperienceRecordsService,
    private readonly mapper: TpJobseekerCvExperienceRecordMapper
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
        'TpJobseekerCvExperienceRecord not found with id: ' + id
      )
    }
  }

  async createFromInput(input: TpJobseekerCvExperienceRecordCreateInput) {
    const props = new TpJobseekerCvExperienceRecordEntityProps()
    Object.assign(props, input)

    const entityToPersist = TpJobseekerCvExperienceRecordEntity.create(props)

    return await this.create(entityToPersist)
  }

  async create(entity: TpJobseekerCvExperienceRecordEntity) {
    const recordToPersist = this.mapper.toPersistence(entity)
    return await this.api.create(recordToPersist)
  }

  async patch(input: TpJobseekerCvExperienceRecordPatchInput) {
    const existingEntity = await this.findOne(input.id)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = TpJobseekerCvExperienceRecordEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }

  async delete(input: TpJobseekerCvExperienceRecordDeleteInput) {
    const existingEntity = await this.findOne(input.id)
    const recordToDelete = this.mapper.toPersistence(existingEntity)
    await this.api.delete(recordToDelete)
  }
}
