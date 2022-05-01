import { Injectable } from '@nestjs/common'
import {
  AccountPersistence,
  CompanyTalentPoolState,
  ConProfilePersistence,
} from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SalesforceApiRepository } from './salesforce-api.repository'

@Injectable()
export class SalesforceApiTpCompanyProfilesService {
  constructor(private readonly repository: SalesforceApiRepository) {}
  // constructor(private readonly repository: SalesforceApiRepository) {}
  async getAllTpEnabledAccounts(
    filter: any = {}
  ): Promise<AccountPersistence[]> {
    filter.ReDI_Talent_Pool_State__c = {
      $in: Object.values(CompanyTalentPoolState),
    }
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: AccountPersistence.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: AccountPersistence.metadata.SALESFORCE_OBJECT_FIELDS,
      filter,
    })
    const records = rawRecords.map((rawRecord) =>
      AccountPersistence.create(rawRecord)
    )
    return records
  }
}
