import { Injectable } from '@nestjs/common'
import { TpJobListingRecord } from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpJobListingsService {
  constructor(private readonly repository: SfApiRepository) {}

  async getAll(filter: any = {}): Promise<TpJobListingRecord[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpJobListingRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: TpJobListingRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      childObjects: TpJobListingRecord.metadata.SALESFORCE_CHILD_OBJECTS,
      filter,
    })
    const jobListings = rawRecords.map((rawRecord) =>
      TpJobListingRecord.create(rawRecord)
    )
    return jobListings
  }

  async updateTpJobListing(record: TpJobListingRecord) {
    const accountProps = record.props

    const cleanAccountProps = omit(accountProps, [
      'CreatedDate',
      'LastModifiedDate',
    ])

    await this.repository.updateRecord(
      TpJobListingRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanAccountProps
    )
  }
}
