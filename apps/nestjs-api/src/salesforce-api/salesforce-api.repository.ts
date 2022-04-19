import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jsforce from 'jsforce'

@Injectable()
export class SalesforceApiRepository {
  private loginUrl: string
  private username: string
  private password: string
  private securityToken: string
  private clientId: string
  private clientSecret: string
  private connection: any

  constructor(private readonly configService: ConfigService) {
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
    const res = await this.connection.login(
      this.username,
      `${this.password}${this.securityToken}`
    )
  }

  // TODO: SfObject should point to the _class_, not an instance of the class.
  // I (Eric) tried for a couple of days to get this to work, without success.
  async allRecordsOfObject(
    objectName: string,
    objectFields: string[]
  ): Promise<any[]> {
    await this.connect()

    const results = await this.connection
      .sobject(objectName)
      .find({}, objectFields)
      .execute({ autoFetch: true, maxFetch: 10000 })

    console.log(`I got ${results.length} records`)
    // console.log(JSON.stringify(results, null, 2))

    return results
  }
}
