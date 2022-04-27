import { Injectable } from '@nestjs/common'
import { ConProfilePersistence } from '@talent-connect/common-types'
import { omit } from 'lodash'
import { SalesforceApiRepository } from './salesforce-api.repository'

@Injectable()
export class SalesforceApiConProfilesService {
  constructor(private readonly repository: SalesforceApiRepository) {}
  // constructor(private readonly repository: SalesforceApiRepository) {}
  async getAllConProfiles(
    conditions: any = {}
  ): Promise<ConProfilePersistence[]> {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: ConProfilePersistence.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: ConProfilePersistence.metadata.SALESFORCE_OBJECT_FIELDS,
      conditions,
    })
    const conProfilesPersistence = rawRecords.map((rawRecord) =>
      ConProfilePersistence.create(rawRecord)
    )
    return conProfilesPersistence
  }

  async getConProfile(id: string): Promise<ConProfilePersistence> {
    const conProfilesPersistence = await this.getAllConProfiles({ Id: id })
    return conProfilesPersistence[0]
  }

  async updateConProfile(
    persistence: ConProfilePersistence
  ): Promise<ConProfilePersistence> {
    const conProfileProps = persistence.props
    const contactProps = conProfileProps.Contact__r

    const cleanConProfileProps = omit(conProfileProps, [
      'Contact__r',
      'CreatedDate',
      'LastModifiedDate',
    ])

    const updateContactResult = await this.repository.updateRecord(
      'Contact',
      contactProps
    )
    const updateConProfileResult = await this.repository.updateRecord(
      ConProfilePersistence.metadata.SALESFORCE_OBJECT_NAME,
      cleanConProfileProps
    )
    const updatedConProfile = await this.getConProfile(conProfileProps.Id)

    return updatedConProfile
  }
}
