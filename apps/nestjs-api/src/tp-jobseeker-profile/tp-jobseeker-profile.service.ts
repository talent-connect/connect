import { Injectable, NotFoundException } from '@nestjs/common'
import { TpJobseekerProfileMapper } from '@talent-connect/common-types'
import { SfApiTpJobseekerProfileService } from '../salesforce-api/sf-api-tp-jobseeker-profile.service'

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
      Id: userId,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('TpJobseekerProfile not found')
    }
  }
}
