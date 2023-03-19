import { Injectable, NotFoundException } from '@nestjs/common'
import {
  TpJobseekerCvEntity,
  TpJobseekerCvEntityProps,
  TpJobseekerCvMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiTpJobseekerCvService } from '../salesforce-api/sf-api-tp-jobseeker-cv.service'
import { TpJobseekerCvCreateInput } from './dto/tp-jobseeker-cv-create.entityinput'
import { TpJobseekerCvDeleteInput } from './dto/tp-jobseeker-cv-delete.entityinput'
import { TpJobseekerCvPatchInput } from './dto/tp-jobseeker-cv-patch.entityinput'

@Injectable()
export class TpJobseekerCvService {
  constructor(
    private readonly api: SfApiTpJobseekerCvService,
    private readonly mapper: TpJobseekerCvMapper
  ) {}

  async findAll(filter: any = {}) {
    const records = await this.api.findAll(filter)

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
      throw new NotFoundException('TpJobseekerCv not found with id: ' + id)
    }
  }

  async findOneByUserId(userId: string) {
    const entities = await this.findAll({
      Contact__c: userId,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('TpJobseekerCv not found')
    }
  }

  async create(input: TpJobseekerCvCreateInput, currentUser: CurrentUserInfo) {
    const props = new TpJobseekerCvEntityProps()
    Object.assign(props, input)
    props.userId = currentUser.userId

    const entityToPersist = TpJobseekerCvEntity.create(props)
    await this.api.create(this.mapper.toPersistence(entityToPersist))
  }

  async patch(input: TpJobseekerCvPatchInput, currentUser: CurrentUserInfo) {
    const existingEntity = await this.findOneByUserId(currentUser.userId)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = TpJobseekerCvEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }

  async delete(input: TpJobseekerCvDeleteInput) {
    const existingEntity = await this.findOne(input.id)
    const recordToDelete = this.mapper.toPersistence(existingEntity)
    await this.api.delete(recordToDelete)
  }
}
