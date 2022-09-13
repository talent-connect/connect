import { Injectable } from '@nestjs/common'
import { TpJobseekerProfileRecord } from '@talent-connect/common-types'
import { SfApiRepository } from './sf-api.repository'

@Injectable()
export class SfApiTpJobseekerProfilesService {
  constructor(private readonly repository: SfApiRepository) {}

  async getAllJobseekerProfiles(filter: any = {}) {
    const rawRecords = await this.repository.findRecordsOfObject({
      objectName: TpJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: TpJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      childObjects: TpJobseekerProfileRecord.metadata.SALESFORCE_CHILD_OBJECTS,
      rawWhereClause: 'Id IN (SELECT Contact__c FROM Jobseeker_Profile__c)',
    })
    const jobseekerProfileRecords = rawRecords.map((rawRecord) =>
      TpJobseekerProfileRecord.create(rawRecord)
    )
    return jobseekerProfileRecords
  }

  async getOne(id: string) {
    const conProfilesRecord = await this.getAllJobseekerProfiles({ Id: id })
    return conProfilesRecord[0]
  }

  // async getContactLanguageRecords(contactId: string) {
  //   const rawRecords = await this.repository.findRecordsOfObject({
  //     objectName: '',
  //   })
  // }
}
