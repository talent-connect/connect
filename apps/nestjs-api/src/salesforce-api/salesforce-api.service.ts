import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jsforce from 'jsforce'
import { SfBaseObject } from './objects/types/sf-base-object.interface'

@Injectable()
export class SalesforceApiService {
  private loginUrl: string
  private username: string
  private password: string
  private securityToken: string
  private clientId: string
  private clientSecret: string
  private connection: any

  constructor(private configService: ConfigService) {
    this.loginUrl = this.configService.get<string>(
      'NX_SALESFORCE_API_LOGIN_URL'
    )
    this.username = this.configService.get<string>('NX_SALESFORCE_API_USERNAME')
    this.password = this.configService.get<string>('NX_SALESFORCE_API_PASSWORD')
    this.securityToken = this.configService.get<string>(
      'NX_SALESFORCE_API_SECURITY_TOKEN'
    )
    this.clientId = this.configService.get<string>(
      'NX_SALESFORCE_API_CLIENT_ID'
    )
    this.clientSecret = this.configService.get<string>(
      'NX_SALESFORCE_API_CLIENT_SECRET'
    )

    this.connection = new jsforce.Connection({
      loginUrl: this.loginUrl,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    })
  }

  async connect() {
    await this.connection.login(
      this.username,
      `${this.password}${this.securityToken}`
    )
  }

  // TODO: SfObject should point to the _class_, not an instance of the class.
  // I (Eric) tried for a couple of days to get this to work, without success.
  async allRecordsOfObject<T extends SfBaseObject>(SfObject: T) {
    const results = await this.connection
      .sobject(SfObject.SALESFORCE_OBJECT_NAME)
      .find({}, SfObject.SALESFORCE_OBJECT_FIELDS)
      .execute({ autoFetch: true, maxFetch: 10000 })

    // con  sole.log(`I got ${results.length} records`)
    // console.log(JSON.stringify(results, null, 2))

    return results
  }

  query(query: string) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result.records)
      })
    })
  }
}
