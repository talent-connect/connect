import { Injectable } from '@nestjs/common'
import { TpJobseekerCvRecord } from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpJobseekerCvService {
  constructor(private readonly repository: SfApiRepository) {}

  async findAll(filter: any = {}) {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpJobseekerCvRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: TpJobseekerCvRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter,
    })
    const records = rawRecords.map((rawRecord) =>
      TpJobseekerCvRecord.create(rawRecord)
    )
    return records
  }

  async create(record: TpJobseekerCvRecord) {
    const props = record.props

    const cleanProps = omit(props, ['CreatedDate', 'LastModifiedDate'])

    const createResult = await this.repository.createRecord(
      TpJobseekerCvRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )

    return createResult
  }

  async update(record: TpJobseekerCvRecord) {
    const props = record.props

    const cleanProps = omit(props, [
      'CreatedDate',
      'LastModifiedDate',
      'Contact__c',
    ])

    await this.repository.updateRecord(
      TpJobseekerCvRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )
  }

  async delete(record: TpJobseekerCvRecord) {
    const props = record.props

    await this.repository.deleteRecord(
      TpJobseekerCvRecord.metadata.SALESFORCE_OBJECT_NAME,
      props.Id
    )
  }
}
