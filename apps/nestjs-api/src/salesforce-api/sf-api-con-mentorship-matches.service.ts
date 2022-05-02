import { Injectable } from '@nestjs/common'
import { ConMentorshipMatchRecord } from '@talent-connect/common-types'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiConMentorshipMatchesService {
  constructor(private readonly repository: SfApiRepository) {}
  // constructor(private readonly repository: SalesforceApiRepository) {}
  async getAllConMentorshipMatches(
    filter: any = {}
  ): Promise<ConMentorshipMatchRecord[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: ConMentorshipMatchRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: ConMentorshipMatchRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter,
    })
    const conMentorshipMatchesRecord = rawRecords.map((rawRecord) =>
      ConMentorshipMatchRecord.create(rawRecord)
    )
    return conMentorshipMatchesRecord
  }
}
