import { Injectable } from '@nestjs/common'
import { TpJobseekerCvLineItemRecord } from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpJobseekerCvEducationRecordsService {
  constructor(private readonly repository: SfApiRepository) {}

  async getAllJobseekerCvLineItemsWithRecordTypeEducation(
    filter: any = {}
  ): Promise<TpJobseekerCvLineItemRecord[]> {
    filter['RecordType.DeveloperName'] = 'Education'
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpJobseekerCvLineItemRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields:
        TpJobseekerCvLineItemRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      childObjects:
        TpJobseekerCvLineItemRecord.metadata.SALESFORCE_CHILD_OBJECTS,
      filter,
    })
    const records = rawRecords.map((rawRecord) =>
      TpJobseekerCvLineItemRecord.create(rawRecord)
    )
    return records
  }

  async create(record: TpJobseekerCvLineItemRecord) {
    const props = record.props

    const recordTypeId = await this.repository.findRecordIdOfObject(
      TpJobseekerCvLineItemRecord.metadata.SALESFORCE_OBJECT_NAME,
      props.RecordType.DeveloperName
    )

    props.RecordTypeId = recordTypeId

    const cleanProps = omit(props, [
      'CreatedDate',
      'LastModifiedDate',
      'RecordType',
    ])

    const createResult = await this.repository.createRecord(
      TpJobseekerCvLineItemRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )

    return createResult
  }

  async update(record: TpJobseekerCvLineItemRecord) {
    const props = record.props

    const cleanProps = omit(props, [
      'CreatedDate',
      'LastModifiedDate',
      'RecordType',
      'Jobseeker_CV__c',
    ])

    return await this.repository.updateRecord(
      TpJobseekerCvLineItemRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )
  }

  async delete(record: TpJobseekerCvLineItemRecord) {
    await this.repository.deleteRecord(
      TpJobseekerCvLineItemRecord.metadata.SALESFORCE_OBJECT_NAME,
      record.props.Id
    )
  }
}
