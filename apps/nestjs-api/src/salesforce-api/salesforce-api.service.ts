import { Injectable } from '@nestjs/common'
import * as jsforce from 'jsforce'
import { ConProfile } from '../con-profiles/entities/con-profile.entity'

const USERNAME = 'eric@redi-school.org.local'
const PASSWORD = 'fdz2drn2bnq@CPW5afd'
const SECURITY_TOKEN = 'M8gmqSWxaoVdK0R6rrca5NP3y'

@Injectable()
export class SalesforceApiService {
  connection = new jsforce.Connection({
    loginUrl: 'https://redischool--local.my.salesforce.com',
    clientId:
      '3MVG9r_yMkYxwhkhe93YHPwED2NXNc8.SxuEEjQypGmL13P_uG7oYxxVemqizk9CLj5ZMK_Q_PPrtT_0Sq7hZ',
    clientSecret:
      'C8324C27F239CDDF43725CA52E93D8356EEDA4E217CC7E3B597EECCD1325E4B5',
  })

  async connect() {
    return new Promise((resolve, reject) => {
      this._connect(resolve)
    })
  }

  _connect(onSuccess: (value: unknown) => void) {
    this.connection.login(
      USERNAME,
      `${PASSWORD}${SECURITY_TOKEN}`,
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

  allRecordsOfObject(objectName: string, fieldList: string[]) {
    return new Promise((resolve, reject) => {
      this.connection
        .sobject(objectName)
        .find({}, fieldList)
        .execute((err, results) => {
          if (err) {
            return reject(err)
          }
          console.log(JSON.stringify(results, null, 2))
          resolve(results)
        })
    })
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
