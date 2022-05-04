import { Injectable } from '@nestjs/common'
import { ConMentorshipMatchRecord } from '@talent-connect/common-types'
import { omit } from 'lodash'
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

  async getConMentorshipMatch(id: string): Promise<ConMentorshipMatchRecord> {
    const conMentorshipMatchRecords = await this.getAllConMentorshipMatches({
      Id: id,
    })
    return conMentorshipMatchRecords[0]
  }

  async updateConMentorshipMatch(
    record: ConMentorshipMatchRecord
  ): Promise<ConMentorshipMatchRecord> {
    const conMentorshipMatchProps = record.props

    const cleanConMentorshipMatchProps = omit(conMentorshipMatchProps, [
      'CreatedDate',
      'LastModifiedDate',
    ])

    const updateConMentorshipMatchResult = await this.repository.updateRecord(
      ConMentorshipMatchRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanConMentorshipMatchProps
    )
    const updatedConMentorshipMatchRecord = await this.getConMentorshipMatch(
      cleanConMentorshipMatchProps.Id
    )

    return updatedConMentorshipMatchRecord
  }
}
