import { Injectable, NotFoundException } from '@nestjs/common'
import {
  TpJobseekerProfileEntity,
  TpJobseekerProfileMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { SfApiTpJobseekerProfileService } from '../salesforce-api/sf-api-tp-jobseeker-profile.service'
import { TpJobseekerProfilePatchInput } from './dto/tp-jobseeker-profile-patch.entityinput'

@Injectable()
export class TpJobseekerProfileService {
  constructor(
    private readonly api: SfApiTpJobseekerProfileService,
    private readonly mapper: TpJobseekerProfileMapper
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
      throw new NotFoundException('TpJobseekerProfile not found with id: ' + id)
    }
  }

  async findOneByUserId(userId: string) {
    const entities = await this.findAll({
      Contact__c: userId,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('TpJobseekerProfile not found')
    }
  }

  async patch(input: TpJobseekerProfilePatchInput) {
    const existingEntity = await this.findOne(input.id)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = TpJobseekerProfileEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }
}
