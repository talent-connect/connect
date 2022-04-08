import { Injectable } from '@nestjs/common'
import { pick } from 'lodash'
import { SalesforceApiService } from '../salesforce-api/salesforce-api.service'

@Injectable()
export class ConProfilesRepository {
  constructor(private readonly salesforceApi: SalesforceApiService) {}

  async findAll() {
    await this.salesforceApi.connect()
    // const results = await this.salesforceApi.query(
    //   'SELECT Id, Expectations__c, Personal_Description__c, RecordType.Name FROM ReDI_Connect_Profile__c'
    // )

    const results: any = await this.salesforceApi.allRecordsOfObject(
      'ReDI_Connect_Profile__c',
      ['RecordType.Name', 'Id', 'Expectations__c', 'Personal_Description__c']
    )

    console.log(JSON.stringify(results, null, 2))

    return results
  }
}
