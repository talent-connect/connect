import { Injectable } from '@nestjs/common'
import { TpJobseekerProfileMapper } from '@talent-connect/common-types'
import { SfApiTpJobseekerProfilesService } from '../salesforce-api/sf-api-tp-jobseeker-profiles.service'

@Injectable()
export class TpJobseekerProfilesService {
  constructor(
    private readonly api: SfApiTpJobseekerProfilesService,
    private readonly mapper: TpJobseekerProfileMapper
  ) {}

  async findAll() {
    const records = await this.api.getAllJobseekerProfiles()

    const entities = records.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }
}
