import { Injectable } from '@nestjs/common'
import { ConMentorshipMatchPersistence } from '@talent-connect/common-types'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiConMentorshipMatchesService {
  constructor(private readonly repository: SfApiRepository) {}
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
