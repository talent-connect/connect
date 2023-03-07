import { Injectable, NotFoundException } from '@nestjs/common'
import {
  AccountContactRecord,
  AccountRecord,
  CompanyTalentPoolState,
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
  //! TODO: the default values here should be moved to the use case / service call
  async createAccountWithName(companyName: string): Promise<AccountRecord> {
    const insertResult = await this.repository.createRecord(
      AccountRecord.metadata.SALESFORCE_OBJECT_NAME,
      {
        Name: companyName,
        ReDI_Talent_Pool_State__c: 'DRAFTING_PROFILE',
        ReDI_Visible_to_Jobseekers__c: false,
      }
    )

    const record = await this.getById(insertResult.id)

    return record
  }

  // TODO: move to another service
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

  // TODO: move to another service
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

  // TODO: move to another service
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

  async getCompanyRepresentativeRelationshipByUser(userId: string) {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: AccountContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: AccountContactRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter: {
        ContactId: userId,
        Roles: { $in: ['TALENT_POOL_COMPANY_REPRESENTATIVE'] },
      },
    })
    if (rawRecords.length === 0)
      throw new NotFoundException(
        '[SfApiTpCompanyProfilesService]' +
          ' getCompanyRepresentativeRelationshipByUser:' +
          ' No company representative relationship found for user'
      )
    const rawRecord = rawRecords[0]
    const record = AccountContactRecord.create(rawRecord)

    return record
  }

  async getCompanyRepresentedByUser(userId: string) {
    const accountContactRecord =
      await this.getCompanyRepresentativeRelationshipByUser(userId)
    const accountRecord = await this.getById(
      accountContactRecord.props.AccountId
    )

    return accountRecord
  }

  async getCompanyRepresentativesByCompany(accountId: string) {
    const rawAccountContactRecords = await this.repository.findRecordsOfObject({
      objectName: AccountContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: AccountContactRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter: {
        AccountId: accountId,
        Roles: { $in: ['TALENT_POOL_COMPANY_REPRESENTATIVE'] },
      },
    })
    const accountContacts = rawAccountContactRecords.map((rawRecord) =>
      AccountContactRecord.create(rawRecord)
    )

    const contactRecords = accountContacts
      .map((accountContact) => accountContact.props.Contact)
      .map((contactProps) => ContactRecord.create(contactProps))

    return contactRecords
  }

  async updateTpCompanyProfile(record: AccountRecord) {
    const accountProps = record.props

    const cleanAccountProps = omit(accountProps, [
      'CreatedDate',
      'LastModifiedDate',
    ])

    await this.repository.updateRecord(
      AccountRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanAccountProps
    )
  }
}
