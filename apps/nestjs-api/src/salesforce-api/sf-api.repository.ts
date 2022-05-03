import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jsforce from 'jsforce'
import { update } from 'lodash'
const async = require('async')

@Injectable()
export class SfApiRepository {
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
        filter = {},
        limit = 5000,
        offset = 0,
      } = task

      let query = this.connection
        .sobject(objectName)
        .find(filter, objectFields, { limit, offset })
      const results = await query.execute({
        autoFetch: true,
        maxFetch: 10000,
      })

      if (results.length > 0)
        console.log(`Found ${results.length} records of ${objectName}`)

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

  async createRecord<T>(
    objectName: string,
    record: T
  ): Promise<{ id: string }> {
    await this.connect()
    const createResult = this.connection.sobject(objectName).create(record)
    return createResult
  }

  async updateRecord<T>(
    objectName: string,
    record: T
  ): Promise<{ id: string }> {
    await this.connect()
    const updateResult = this.connection.sobject(objectName).update(record)
    return updateResult
  }
}

interface FindRecordsParams {
  objectName: string
  objectFields: string[]
  filter?: any
  limit?: number
  offset?: number
}
