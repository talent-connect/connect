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

  async findOne(id: string, loadLanguages: boolean = false) {
    const record = await this.api.getOne(id)

    const entity = this.mapper.fromPersistence(record)

    if (loadLanguages) {
    }

    return entity
  }

  private async loadContactLanguages(contactId: string) {}
}
