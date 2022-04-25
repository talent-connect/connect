import { Injectable } from '@nestjs/common'
import { ConMentoringSessionPersistence } from '@talent-connect/common-types'
import { SalesforceApiRepository } from './salesforce-api.repository'

@Injectable()
export class SalesforceApiConMentoringSessionsService {
  constructor(private readonly repository: SalesforceApiRepository) {}
  // constructor(private readonly repository: SalesforceApiRepository) {}
  async getAllConMentoringSessions(
    conditions: any = {},
    limit: number = 100,
    offset: number = 0
  ): Promise<ConMentoringSessionPersistence[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName:
        ConMentoringSessionPersistence.metadata.SALESFORCE_OBJECT_NAME,
      objectFields:
        ConMentoringSessionPersistence.metadata.SALESFORCE_OBJECT_FIELDS,
      conditions,
      limit,
      offset,
    })
    const conMentoringSessionsPersistence = rawRecords.map((rawRecord) =>
      ConMentoringSessionPersistence.create(rawRecord)
    )
    return conMentoringSessionsPersistence
  }
}
