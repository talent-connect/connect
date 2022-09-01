import { Injectable } from '@nestjs/common'
import { SfApiTpJobseekerProfilesService } from '../salesforce-api/sf-api-tp-jobseeker-profiles.service'

@Injectable()
export class TpJobseekerProfilesService {
  constructor(private readonly api: SfApiTpJobseekerProfilesService) {}

  async findAll() {
    const records = await this.api.getAllJobseekerProfiles()

    console.log(records)

    return []
  }
}
