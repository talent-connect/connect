import { Injectable } from '@nestjs/common'
import { TpJobseekerProfileRecord } from '@talent-connect/common-types'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpJobseekerProfilesService {
  constructor(private readonly repository: SfApiRepository) {}

  async getAllJobseekerProfiles() {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: TpJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      childObjects: TpJobseekerProfileRecord.metadata.SALESFORCE_CHILD_OBJECTS,
    })
    const jobseekerProfileRecords = rawRecords.map((rawRecord) =>
      TpJobseekerProfileRecord.create(rawRecord)
    )
    return jobseekerProfileRecords
  }
}
