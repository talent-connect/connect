import { Injectable } from '@nestjs/common'
import { TpContactLanguageRecord } from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpContactLanguageRecordsService {
  constructor(private readonly repository: SfApiRepository) { }

  async getAll(filter: any = {}): Promise<TpContactLanguageRecord[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpContactLanguageRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: TpContactLanguageRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      childObjects: TpContactLanguageRecord.metadata.SALESFORCE_CHILD_OBJECTS,
      filter,
      orderBy: TpContactLanguageRecord.metadata.SALESFORCE_ORDER_BY,
    })
    const records = rawRecords.map((rawRecord) =>
      TpContactLanguageRecord.create(rawRecord)
    )
    return records
  }

  async create(record: TpContactLanguageRecord) {
    const props = record.props

    const hedLanguage = await this.repository.findRecordsOfObject({
      objectName: '	hed__Language__c',
      objectFields: ['Id'],
      filter: {
        Slug__c: props.hed__Language__r.Slug__c,
      },
    })
    const hedLanguageId = hedLanguage[0].Id
    props.hed__Language__c = hedLanguageId

    const cleanProps = omit(props, [
      'CreatedDate',
      'LastModifiedDate',
      'hed__Language__r',
    ])

    const createResult = await this.repository.createRecord(
      TpContactLanguageRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )

    return createResult
  }

  async update(record: TpContactLanguageRecord) {
    const props = record.props

    const hedLanguage = await this.repository.findRecordsOfObject({
      objectName: '	hed__Language__c',
      objectFields: ['Id'],
      filter: {
        Slug__c: props.hed__Language__r.Slug__c,
      },
    })
    const hedLanguageId = hedLanguage[0].Id
    props.hed__Language__c = hedLanguageId

    const cleanProps = omit(props, [
      'CreatedDate',
      'LastModifiedDate',
      'hed__Contact__c',
      'hed__Language__r',
    ])

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
