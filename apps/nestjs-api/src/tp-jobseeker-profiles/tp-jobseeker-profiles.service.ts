import { Injectable, NotFoundException } from '@nestjs/common'
import { TpJobseekerProfileMapper } from '@talent-connect/common-types'
import { SfApiTpJobseekerProfilesService } from '../salesforce-api/sf-api-tp-jobseeker-profiles.service'

@Injectable()
export class TpJobseekerProfilesService {
  constructor(
    private readonly api: SfApiTpJobseekerProfilesService,
    private readonly mapper: TpJobseekerProfileMapper
  ) {}

  async findAll(filter: any = {}) {
    const records = await this.api.findAllJobseekerProfiles(filter)

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
}
