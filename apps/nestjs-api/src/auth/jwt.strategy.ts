import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import {
  ContactRecord,
  ContactRecordProps,
  UserContactMapper,
} from '@talent-connect/common-types'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SfApiRepository } from '../salesforce-api/sf-api.repository'
import { CurrentUserInfo } from './current-user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly salesforceRepository: SfApiRepository,
    private readonly userMapper: UserContactMapper
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('NX_JWT_SECRET'),
    })
  }

  //! TODO: access this data properly via a service, not via the sf repository...
  async validate(payload: any): Promise<CurrentUserInfo> {
    // Require all requests to come from a user with a
    // verified email address. The incoming payload is a
    // JWT token that was created and signed by Loopback.
    if (!payload.emailVerified) {
      throw new UnauthorizedException('Email not verified')
    }

    const { email, loopbackUserId, firstName, lastName } = payload

    if (!email || !loopbackUserId) {
      throw new UnauthorizedException('User data missing from JWT token')
    }

    //! TODO: introduce caching here, this is a lot of simple loolups
    // for something that will never change. Can DataLoader fix it?
    let contactRecord: ContactRecordProps = null

    let contactRecords = await this.salesforceRepository.findRecordsOfObject({
      objectName: ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields: ContactRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter: {
        // Loopback_User_ID__c: loopbackUserId,
        ReDI_Email_Address__c: email,
      },
    })

    if (contactRecords.length === 0) {
      const createContactResult = await this.salesforceRepository.createRecord(
        ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
        {
          FirstName: firstName,
          LastName: lastName,
          ReDI_Email_Address__c: email,
          Loopback_User_ID__c: loopbackUserId,
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
      if (!contactRecord.Loopback_User_ID__c) {
        await this.salesforceRepository.updateRecord(
          ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
          {
            Id: contactRecord.Id,
            Loopback_User_ID__c: loopbackUserId,
          }
        )
        contactRecord.Loopback_User_ID__c = loopbackUserId
      }
    }

    this.salesforceRepository.updateRecord(
      ContactRecord.metadata.SALESFORCE_OBJECT_NAME,
      {
        Id: contactRecord.Id,
        ReDI_CON_TP_User_Last_Active_On__c: new Date().toISOString(),
      }
    )

    const userEntity = this.userMapper.fromPersistence(
      ContactRecord.create(contactRecord)
    )

    return {
      loopbackUserId: userEntity.props.loopbackUserId,
      userId: userEntity.props.id,
      userProps: userEntity.props,
    }
  }
}
