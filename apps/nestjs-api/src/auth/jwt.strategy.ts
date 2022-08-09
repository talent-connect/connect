import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import {
  ContactRecord,
  ContactRecordProps,
  UserMapper,
} from '@talent-connect/common-types'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SfApiRepository } from '../salesforce-api/sf-api.repository'
import { CurrentUserInfo } from './current-user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly salesforceRepository: SfApiRepository,
    private readonly userMapper: UserMapper
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('NX_JWT_SECRET'),
    })
  }

  //! TODO: access this data properly via a service, not via the sf repository...
  async validate(payload: any): Promise<CurrentUserInfo> {
    const loopbackUserId = payload.userId
    const email = payload.email
    //! TODO: introduce caching here, this is a lot of simple loolups
    // for something that will never change. Can DataLoader fix it?
    let contactRecord: ContactRecordProps = null

    let contactRecords = await this.salesforceRepository.findRecordsOfObject({
      objectName: ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: ContactRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter: { Loopback_User_ID__c: loopbackUserId, Email: email },
    })

    if (contactRecords.length === 0) {
      const createContactResult = await this.salesforceRepository.createRecord(
        ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
        {
          FirstName: 'CON/TP Contact in creation',
          LastName: email,
          Email: email,
          Loopback_User_ID__c: payload.userId,
        }
      )
      contactRecords = await this.salesforceRepository.findRecordsOfObject({
        objectName: ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
        objectFields: ContactRecord.metadata.SALESFORCE_OBJECT_FIELDS,
        filter: { Id: createContactResult.id },
      })
      contactRecord = contactRecords[0]
    } else {
      contactRecord = contactRecords[0]
    }

    const userEntity = this.userMapper.fromPersistence(
      ContactRecord.create(contactRecord)
    )

    return {
      loopbackUserId: payload.userId,
      userId: userEntity.props.id,
      userProps: userEntity.props,
    }
  }
}
