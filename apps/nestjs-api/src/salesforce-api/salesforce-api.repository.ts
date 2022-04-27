import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jsforce from 'jsforce'
import * as _ from 'lodash'
const async = require('async')

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
      maxRequest: 100,
    })
  }

  async connect() {
    const res = await this.connection.login(
      this.username,
      `${this.password}${this.securityToken}`
    )
  }

  private findRecordsOfObjectQueue = async.queue(
    async (task: FindRecordsParams, callback) => {
      await this.connect()
      const {
        objectName,
        objectFields,
        conditions = {},
        limit = 5000,
        offset = 0,
      } = task

      let query = this.connection
        .sobject(objectName)
        .find(conditions, objectFields, { limit, offset })
      const results = await query.execute({
        autoFetch: true,
        maxFetch: 10000,
      })

      if (results.length > 0) console.log(`I got ${results.length} records`)

      callback(results)
    },
    40
  )

  findRecordsOfObject(args: FindRecordsParams): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.findRecordsOfObjectQueue.push(args, (result) => {
        resolve(result)
      })
    })
  }

  async findSingleRecord(objectName: string, id: string): Promise<any> {
    await this.connect()

    const record = await this.connection
      .sobject(objectName)
      .find({ Id: id })
      .execute()

    return record[0]
  }
}

interface FindRecordsParams {
  objectName: string
  objectFields: string[]
  conditions?: any
  limit?: number
  offset?: number
}
