import { Injectable } from '@nestjs/common'
import {
  AccountContactRecord,
  AccountRecord,
  CompanyTalentPoolState,
  ConProfileRecord,
  ContactRecord,
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

  async getById(id: string): Promise<AccountRecord> {
    const records = await this.getAllTpEnabledAccounts({ Id: id })

    return records[0]
  }

  // TODO: Eliminate this method, replace with a generic createAccount instead that takes
  // a Record object as input
  async createAccountWithName(companyName: string): Promise<AccountRecord> {
    const insertResult = await this.repository.createRecord(
      AccountRecord.metadata.SALESFORCE_OBJECT_NAME,
      {
        Name: companyName,
        ReDI_Talent_Pool_State__c: 'DRAFTING_PROFILE',
      }
    )

    const record = await this.getById(insertResult.id)

    return record
  }

  async getContactById(id: string): Promise<ContactRecord> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: ContactRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter: { Id: id },
    })
    const rawRecord = rawRecords[0]
    const record = ContactRecord.create(rawRecord)

    return record
  }

  async getAccountContactById(id: string): Promise<AccountContactRecord> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: AccountContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: AccountContactRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter: { Id: id },
    })
    const rawRecord = rawRecords[0]
    const record = AccountContactRecord.create(rawRecord)

    return record
  }

  async createContact(contact: ContactRecord): Promise<ContactRecord> {
    const cleanProps = omit(contact.props, ['Id'])

    const createContactResult = await this.repository.createRecord(
      ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanProps
    )

    const createdContactRecord = await this.getContactById(
      createContactResult.id
    )

    return createdContactRecord
  }

  async updateContact(contact: ContactRecord): Promise<ContactRecord> {
    const updatedContactResult = await this.repository.updateRecord(
      ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      contact.props
    )

    const updatedContactRecord = await this.getContactById(
      updatedContactResult.id
    )

    return updatedContactRecord
  }

  async createAccountContactRelationship(accountContact: AccountContactRecord) {
    return await this.repository.createRecord(
      AccountContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      accountContact.props
    )
  }
}
