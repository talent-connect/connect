import { Injectable } from '@nestjs/common'
import { TpContactLanguageRecord } from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpContactLanguageRecordsService {
  constructor(private readonly repository: SfApiRepository) {}

  async getAllJobseekerLineItemsWithRecordTypeLanguage(
    filter: any = {}
  ): Promise<TpContactLanguageRecord[]> {
    filter['RecordType.DeveloperName'] = 'Language'
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpContactLanguageRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: TpContactLanguageRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      childObjects: TpContactLanguageRecord.metadata.SALESFORCE_CHILD_OBJECTS,
      filter,
    })
    const records = rawRecords.map((rawRecord) =>
      TpContactLanguageRecord.create(rawRecord)
    )
    return records
  }

  async create(record: TpContactLanguageRecord) {
    const props = record.props

    const cleanProps = omit(props, ['CreatedDate', 'LastModifiedDate'])

    const createResult = await this.repository.createRecord(
      TpContactLanguageRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )

    return createResult
  }

  async update(record: TpContactLanguageRecord) {
    const props = record.props

    const cleanProps = omit(props, ['CreatedDate', 'LastModifiedDate'])

    return await this.repository.updateRecord(
      TpContactLanguageRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )
  }

  async delete(record: TpContactLanguageRecord) {
    await this.repository.deleteRecord(
      TpContactLanguageRecord.metadata.SALESFORCE_OBJECT_NAME,
      record.props.Id
    )
  }
}
