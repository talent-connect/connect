import { Injectable } from '@nestjs/common'
import { ConMentoringSessionRecord } from '@talent-connect/common-types'
import { pick } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiConMentoringSessionsService {
  constructor(private readonly repository: SfApiRepository) {}
  // constructor(private readonly repository: SalesforceApiRepository) {}
  async getAllConMentoringSessions(
    filter: any = {}
  ): Promise<ConMentoringSessionRecord[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: ConMentoringSessionRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: ConMentoringSessionRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter,
    })
    const conMentoringSessionsRecord = rawRecords.map((rawRecord) =>
      ConMentoringSessionRecord.create(rawRecord)
    )
    return conMentoringSessionsRecord
  }

  async getConMentoringSession(id: string): Promise<ConMentoringSessionRecord> {
    const entities = await this.getAllConMentoringSessions({ Id: id })
    return entities[0]
  }

  async createConMentoringSession(record: ConMentoringSessionRecord) {
    const cleanProps = pick(record.props, [
      'Date__c',
      'Durations_in_Minutes__c',
      'Mentor__c',
      'Mentee__c',
    ])

    const createResult = await this.repository.createRecord(
      ConMentoringSessionRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )

    const createdRecord = await this.getConMentoringSession(createResult.id)

    return createdRecord
  }
}
