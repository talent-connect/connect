import { Injectable } from '@nestjs/common'
import { ConMentorshipMatchPersistence } from '@talent-connect/common-types'
import { SalesforceApiRepository } from './salesforce-api.repository'

@Injectable()
export class SalesforceApiConMentorshipMatchesService {
  constructor(private readonly repository: SalesforceApiRepository) {}
  // constructor(private readonly repository: SalesforceApiRepository) {}
  async getAllConMentorshipMatches(
    filter: any = {}
  ): Promise<ConMentorshipMatchPersistence[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: ConMentorshipMatchPersistence.metadata.SALESFORCE_OBJECT_NAME,
      objectFields:
        ConMentorshipMatchPersistence.metadata.SALESFORCE_OBJECT_FIELDS,
      filter,
    })
    const conMentorshipMatchesPersistence = rawRecords.map((rawRecord) =>
      ConMentorshipMatchPersistence.create(rawRecord)
    )
    return conMentorshipMatchesPersistence
  }
}
