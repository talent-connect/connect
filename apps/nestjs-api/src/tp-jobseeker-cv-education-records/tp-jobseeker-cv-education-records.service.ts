import { Injectable, NotFoundException } from '@nestjs/common'
import {
  TpJobseekerCvEducationRecordEntity,
  TpJobseekerCvEducationRecordEntityProps,
  TpJobseekerCvEducationRecordMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { SfApiTpJobseekerCvEducationRecordsService } from '../salesforce-api/sf-api-tp-jobseeker-cv-education-records.service'
import { TpJobseekerCvEducationRecordCreateInput } from './dtos/tp-jobseeker-cv-education-record-create.entityinput'
import { TpJobseekerCvEducationRecordDeleteInput } from './dtos/tp-jobseeker-cv-education-record-delete.entityinput'
import { TpJobseekerCvEducationRecordPatchInput } from './dtos/tp-jobseeker-cv-education-record-patch.entityinput'

@Injectable()
export class TpJobseekerCvEducationRecordsService {
  constructor(
    private readonly api: SfApiTpJobseekerCvEducationRecordsService,
    private readonly mapper: TpJobseekerCvEducationRecordMapper
  ) {}

  async findAll(filter: any = {}) {
    const records =
      await this.api.getAllJobseekerCvLineItemsWithRecordTypeEducation(filter)

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
        'TpJobseekerCvEducationRecord not found with id: ' + id
      )
    }
  }

  async createFromInput(input: TpJobseekerCvEducationRecordCreateInput) {
    const props = new TpJobseekerCvEducationRecordEntityProps()
    Object.assign(props, input)

    const entityToPersist = TpJobseekerCvEducationRecordEntity.create(props)

    return await this.create(entityToPersist)
  }

  async create(entity: TpJobseekerCvEducationRecordEntity) {
    const recordToPersist = this.mapper.toPersistence(entity)
    return await this.api.create(recordToPersist)
  }

  async patch(input: TpJobseekerCvEducationRecordPatchInput) {
    const existingEntity = await this.findOne(input.id)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = TpJobseekerCvEducationRecordEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }

  async delete(input: TpJobseekerCvEducationRecordDeleteInput) {
    const existingEntity = await this.findOne(input.id)
    const recordToDelete = this.mapper.toPersistence(existingEntity)
    await this.api.delete(recordToDelete)
  }
}
