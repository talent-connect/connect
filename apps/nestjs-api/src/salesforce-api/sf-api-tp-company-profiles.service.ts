import { Injectable } from '@nestjs/common'
import {
  AccountRecord,
  CompanyTalentPoolState,
  ConProfileRecord,
} from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpCompanyProfilesService {
  constructor(private readonly repository: SfApiRepository) {}
  // constructor(private readonly repository: SalesforceApiRepository) {}
  async getAllTpEnabledAccounts(filter: any = {}): Promise<AccountRecord[]> {
    filter.ReDI_Talent_Pool_State__c = {
      $in: Object.values(CompanyTalentPoolState),
    }
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: AccountRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: AccountRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter,
    })
    const records = rawRecords.map((rawRecord) =>
      AccountRecord.create(rawRecord)
    )
    return records
  }

  async createAccount() {}

  async createContact() {}
  async createAccountContactRelationship() {}
}
