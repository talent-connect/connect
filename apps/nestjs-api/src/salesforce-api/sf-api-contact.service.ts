import { Injectable } from '@nestjs/common'
import { ContactRecord } from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiContactService {
  constructor(private readonly repository: SfApiRepository) {}

  async getAllContacts(filter: any = {}): Promise<ContactRecord[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: ContactRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter,
    })
    const contactRecords = rawRecords.map((rawRecord) =>
      ContactRecord.create(rawRecord)
    )
    return contactRecords
  }

  async getContact(id: string): Promise<ContactRecord> {
    const contactRecord = await this.getAllContacts({ Id: id })
    return contactRecord[0]
  }

  async getContactByEmail(email: string): Promise<ContactRecord> {
    const contactRecord = await this.getAllContacts({
      ReDI_Email_Address__c: email,
    })
    return contactRecord[0]
  }

  async updateContact(record: ContactRecord) {
    const contactProps = record.props

    const cleanContactProps = omit(contactProps, [
      'CreatedDate',
      'LastModifiedDate',
    ])

    await this.repository.updateRecord(
      ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      cleanContactProps
    )
  }
}
