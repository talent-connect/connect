import { Injectable } from '@nestjs/common'
import { TpJobListingRecord } from '@talent-connect/common-types'
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
}
