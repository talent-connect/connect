import { Injectable } from '@nestjs/common'
import { ConProfilePersistence } from '@talent-connect/common-types'
import { SalesforceApiRepository } from './salesforce-api.repository'

@Injectable()
export class SalesforceApiConProfilesService {
  constructor(private readonly repository: SalesforceApiRepository) {}
  // constructor(private readonly repository: SalesforceApiRepository) {}
  async getAllConProfiles(): Promise<ConProfilePersistence[]> {
    const rawRecords = await this.repository.allRecordsOfObject(
      ConProfilePersistence.metadata.SALESFORCE_OBJECT_NAME,
      ConProfilePersistence.metadata.SALESFORCE_OBJECT_FIELDS
    )
    const conProfilesPersistence = rawRecords.map((rawRecord) =>
      ConProfilePersistence.create(rawRecord)
    )
    return conProfilesPersistence
  }
}
