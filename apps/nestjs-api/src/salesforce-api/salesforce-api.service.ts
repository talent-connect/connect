import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jsforce from 'jsforce'

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
      clientId:
        '3MVG9r_yMkYxwhkhe93YHPwED2H06d8Z1zYgRHAgkljlSq2x8XtnqpP4GdpS4.GDeqEgOVLfi2E1YNLxk4WaZ',
      clientSecret:
        'C41F3552AA09D4F8E375E3854D9C73A5EE769B8476915022FC68436523C6CA9A',
    })
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this._connect(resolve)
    })
  }

  _connect(onSuccess: (value: unknown) => void) {
    this.connection.login(
      this.username,
      `${this.password}${this.securityToken}`,
      (err, userInfo) => {
        if (err) {
          return console.error(err)
        }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        // console.log(this.connection.accessToken)
        // console.log(this.connection.instanceUrl)
        // logged in user property
        // console.log('User ID: ' + userInfo.id)
        // console.log('Org ID: ' + userInfo.organizationId)
        // ...

        onSuccess(null)
      }
    )
  }

  async allRecordsOfObject(objectName: string, fieldList: string[]) {
    const results = await this.connection
      .sobject(objectName)
      .find({}, fieldList)
      .execute()
    console.log(JSON.stringify(results, null, 2))
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
