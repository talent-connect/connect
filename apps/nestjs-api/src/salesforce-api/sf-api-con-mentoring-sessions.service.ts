import { Injectable } from '@nestjs/common'
import { ConMentoringSessionPersistence } from '@talent-connect/common-types'
import { pick } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiConMentoringSessionsService {
  constructor(private readonly repository: SfApiRepository) {}
  // constructor(private readonly repository: SalesforceApiRepository) {}
  async getAllConMentoringSessions(
    filter: any = {}
  ): Promise<ConMentoringSessionPersistence[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName:
        ConMentoringSessionPersistence.metadata.SALESFORCE_OBJECT_NAME,
      objectFields:
        ConMentoringSessionPersistence.metadata.SALESFORCE_OBJECT_FIELDS,
      filter,
    })
    const conMentoringSessionsPersistence = rawRecords.map((rawRecord) =>
      ConMentoringSessionPersistence.create(rawRecord)
    )
    return conMentoringSessionsPersistence
  }

  async getConMentoringSession(
    id: string
  ): Promise<ConMentoringSessionPersistence> {
    const entities = await this.getAllConMentoringSessions({ Id: id })
    return entities[0]
  }

  async createConMentoringSession(persistence: ConMentoringSessionPersistence) {
    const cleanProps = pick(persistence.props, [
      'Date__c',
      'Durations_in_Minutes__c',
      'Mentor__c',
      'Mentee__c',
    ])

    const createResult = await this.repository.createRecord(
      ConMentoringSessionPersistence.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )

    const createdPersistence = await this.getConMentoringSession(
      createResult.id
    )

    return createdPersistence
  }
}
