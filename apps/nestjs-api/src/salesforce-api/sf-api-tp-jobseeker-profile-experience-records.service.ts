import { Injectable } from '@nestjs/common'
import { TpJobseekerLineItemRecord } from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpJobseekerProfileExperienceRecordsService {
  constructor(private readonly repository: SfApiRepository) {}

  async getAllJobseekerLineItemsWithRecordTypeExperience(
    filter: any = {}
  ): Promise<TpJobseekerLineItemRecord[]> {
    filter['RecordType.DeveloperName'] = 'Experience'
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpJobseekerLineItemRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: TpJobseekerLineItemRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      childObjects: TpJobseekerLineItemRecord.metadata.SALESFORCE_CHILD_OBJECTS,
      filter,
    })
    const records = rawRecords.map((rawRecord) =>
      TpJobseekerLineItemRecord.create(rawRecord)
    )
    return records
  }

  async create(record: TpJobseekerLineItemRecord) {
    const props = record.props

    const cleanProps = omit(props, ['CreatedDate', 'LastModifiedDate'])

    const createResult = await this.repository.createRecord(
      TpJobseekerLineItemRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )

    return createResult
  }

  async update(record: TpJobseekerLineItemRecord) {
    const props = record.props

    const cleanProps = omit(props, ['CreatedDate', 'LastModifiedDate'])

    return await this.repository.updateRecord(
      TpJobseekerLineItemRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )
  }

  async delete(record: TpJobseekerLineItemRecord) {
    await this.repository.deleteRecord(
      TpJobseekerLineItemRecord.metadata.SALESFORCE_OBJECT_NAME,
      record.props.Id
    )
  }
}
