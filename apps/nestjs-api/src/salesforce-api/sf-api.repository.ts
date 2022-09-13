import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SalesforceMutationIdResult } from '@talent-connect/common-types'
import * as jsforce from 'jsforce'
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
    try {
      const res = await this.connection.login(
        this.username,
        `${this.password}${this.securityToken}`
      )
    } catch (err) {
      console.log('connection err', err)
    }
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
        childObjects,
        rawWhereClause,
      } = task

      let query = this.connection
        .sobject(objectName)
        .find(filter, objectFields, { limit, offset })
      if (childObjects) {
        childObjects.forEach((childObject) => {
          query.include(childObject.name).select(childObject.fields).end()
        })
      }
      if (rawWhereClause) {
        query = query.where(rawWhereClause)
      }

      const results = await query.execute({
        autoFetch: true,
        maxFetch: 10000,
      })

      if (results.length > 0)
        console.log(
          '[SfApiRepository]',
          `Found ${results.length} records of ${objectName}`
        )

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
  ): Promise<SalesforceMutationIdResult> {
    await this.connect()
    const createResult = await this.connection
      .sobject(objectName)
      .create(record)
    console.log(
      `[SfApiRepository] CREATEd ${objectName} record with id ${createResult.id}`
    )
    return createResult
  }

  async updateRecord<T>(
    objectName: string,
    record: T
  ): Promise<SalesforceMutationIdResult> {
    await this.connect()
    const updateResult = await this.connection
      .sobject(objectName)
      .update(record)
    console.log(
      `[SfApiRepository] UPDATEd ${objectName} record with id ${updateResult.id}`
    )
    return updateResult
  }

  async deleteRecord<T>(objectName: string, recordId: string): Promise<void> {
    await this.connection.sobject(objectName).delete(recordId)
    console.log(
      `[SfApiRepository] DELETEd ${objectName} record with id ${recordId}`
    )
  }

  async findUpdateOrInsert<T>(
    objectName: string,
    filter: any,
    record: T
  ): Promise<SalesforceMutationIdResult> {
    await this.connect()
    const findResult = await this.findRecordsOfObject({
      objectName: objectName,
      objectFields: ['Id'],
      filter: filter,
      limit: 1,
    })
    if (findResult.length > 0) {
      const existingRecord = findResult[0]
      const updatedRecord = {
        Id: existingRecord.Id,
        ...record,
      }
      const updateResult = await this.updateRecord(objectName, updatedRecord)
      return { id: updateResult.id }
    } else {
      const insertedRecordResult = await this.createRecord(objectName, record)
      return { id: insertedRecordResult.id }
    }
  }

  async findRecordIdOfObject(
    objectName: string,
    recordName: string
  ): Promise<string> {
    await this.connect()
    try {
      const result = await this.connection.sobject(objectName).describe()
      return result.recordTypeInfos.find(
        (recordType) =>
          recordType.name.toLowerCase() === recordName.toLowerCase()
      ).recordTypeId
    } catch (err) {
      throw new Error(
        `[SfApiRepository] Could not find record type id (sobject ${objectName}, record name ${recordName})`
      )
    }
  }
}

interface FindRecordsParams {
  objectName: string
  objectFields: string[]
  filter?: any
  limit?: number
  offset?: number
  childObjects?: { name: string; fields: string[] }[]
  rawWhereClause?: string
}
