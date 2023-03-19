import { Injectable } from '@nestjs/common'
import { TpJobseekerCvLanguageRecord } from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpJobseekerCvLanguageRecordsService {
  constructor(private readonly repository: SfApiRepository) {}

  async getAll(filter: any = {}): Promise<TpJobseekerCvLanguageRecord[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpJobseekerCvLanguageRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields:
        TpJobseekerCvLanguageRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      childObjects:
        TpJobseekerCvLanguageRecord.metadata.SALESFORCE_CHILD_OBJECTS,
      filter,
    })
    const records = rawRecords.map((rawRecord) =>
      TpJobseekerCvLanguageRecord.create(rawRecord)
    )
    return records
  }

  async create(record: TpJobseekerCvLanguageRecord) {
    const props = record.props

    const language = await this.repository.findRecordsOfObject({
      objectName: '	_Language__c',
      objectFields: ['Id'],
      filter: {
        Slug__c: props.Language__r.Slug__c,
      },
    })
    const languageId = language[0].Id
    props.Language__c = languageId

    const cleanProps = omit(props, [
      'CreatedDate',
      'LastModifiedDate',
      'Language__r',
    ])

    const createResult = await this.repository.createRecord(
      TpJobseekerCvLanguageRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )

    return createResult
  }

  async update(record: TpJobseekerCvLanguageRecord) {
    const props = record.props

    const language = await this.repository.findRecordsOfObject({
      objectName: '	Language__c',
      objectFields: ['Id'],
      filter: {
        Slug__c: props.Language__r.Slug__c,
      },
    })
    const languageId = language[0].Id
    props.Language__c = languageId

    const cleanProps = omit(props, [
      'CreatedDate',
      'LastModifiedDate',
      'Jobseeker_CV__c',
    ])

    return await this.repository.updateRecord(
      TpJobseekerCvLanguageRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )
  }

  async delete(record: TpJobseekerCvLanguageRecord) {
    await this.repository.deleteRecord(
      TpJobseekerCvLanguageRecord.metadata.SALESFORCE_OBJECT_NAME,
      record.props.Id
    )
  }
}
