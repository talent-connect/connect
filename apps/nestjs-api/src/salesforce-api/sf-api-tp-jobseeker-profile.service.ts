import { Injectable } from '@nestjs/common'
import { TpJobseekerProfileRecord } from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpJobseekerProfileService {
  constructor(private readonly repository: SfApiRepository) {}

  async findAll(filter: any = {}) {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: TpJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter,
    })
    const records = rawRecords.map((rawRecord) =>
      TpJobseekerProfileRecord.create(rawRecord)
    )
    return records
  }

  async update(record: TpJobseekerProfileRecord) {
    const props = record.props

    const cleanProps = omit(props, ['CreatedDate', 'LastModifiedDate'])

    await this.repository.updateRecord(
      TpJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )
  }
}
