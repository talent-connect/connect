import { Injectable } from '@nestjs/common'
import { ConProfilePersistence } from '@talent-connect/common-types'
import { SalesforceApiRepository } from './salesforce-api.repository'

@Injectable()
export class SalesforceApiConProfilesService {
  constructor(private readonly repository: SalesforceApiRepository) {}
  // constructor(private readonly repository: SalesforceApiRepository) {}
  async getAllConProfiles(
    conditions: any = {},
    limit: number = 100,
    offset: number = 0
  ): Promise<ConProfilePersistence[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: ConProfilePersistence.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: ConProfilePersistence.metadata.SALESFORCE_OBJECT_FIELDS,
      conditions,
      limit,
      offset,
    })
    const conProfilesPersistence = rawRecords.map((rawRecord) =>
      ConProfilePersistence.create(rawRecord)
    )
    return conProfilesPersistence
  }
}
