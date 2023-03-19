import { Injectable, NotFoundException } from '@nestjs/common'
import {
  TpJobseekerCvLanguageRecordEntity,
  TpJobseekerCvLanguageRecordEntityProps,
  TpJobseekerCvLanguageRecordMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiTpJobseekerCvLanguageRecordsService } from '../salesforce-api/sf-api-tp-jobseeker-cv-language-records.service'
import { TpJobseekerCvService } from '../tp-jobseeker-cv/tp-jobseeker-cv.service'
import { TpJobseekerCvLanguageRecordCreateInput } from './dtos/tp-jobseeker-cv-language-record-create.entityinput'
import { TpJobseekerCvLanguageRecordDeleteInput } from './dtos/tp-jobseeker-cv-language-record-delete.entityinput'
import { TpJobseekerCvLanguageRecordPatchInput } from './dtos/tp-jobseeker-cv-language-record-patch.entityinput'

@Injectable()
export class TpJobseekerCvLanguageRecordsService {
  constructor(
    private readonly api: SfApiTpJobseekerCvLanguageRecordsService,
    private readonly mapper: TpJobseekerCvLanguageRecordMapper,
    private readonly tpJobseekerCvService: TpJobseekerCvService
  ) {}

  async findAll(filter: any = {}) {
    const records = await this.api.getAll(filter)

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
        'TpJobseekerCvLanguageRecord not found with id: ' + id
      )
    }
  }

  async create(
    input: TpJobseekerCvLanguageRecordCreateInput,
    user: CurrentUserInfo
  ) {
    const props = new TpJobseekerCvLanguageRecordEntityProps()
    Object.assign(props, input)

    const entityToPersist = TpJobseekerCvLanguageRecordEntity.create(props)
    const recordToPersist = this.mapper.toPersistence(entityToPersist)

    return await this.api.create(recordToPersist)
  }

  async patch(input: TpJobseekerCvLanguageRecordPatchInput) {
    const existingEntity = await this.findOne(input.id)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = TpJobseekerCvLanguageRecordEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }

  async delete(input: TpJobseekerCvLanguageRecordDeleteInput) {
    const existingEntity = await this.findOne(input.id)
    const recordToDelete = this.mapper.toPersistence(existingEntity)
    await this.api.delete(recordToDelete)
  }
}
