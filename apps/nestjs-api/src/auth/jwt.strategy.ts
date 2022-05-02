import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SfApiRepository } from '../salesforce-api/sf-api.repository'
import { CurrentUserInfo } from './current-user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly salesforceRepository: SfApiRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('NX_JWT_SECRET'),
    })
  }

  //! TODO: access this data properly via a service, not via the sf repository...
  async validate(payload: any): Promise<CurrentUserInfo> {
    //! TODO: introduce caching here, this is a lot of simple loolups
    // for something that will never change. Can DataLoader fix it?
    const contactRecords = await this.salesforceRepository.findRecordsOfObject({
      objectName: 'Contact',
      objectFields: ['Id'],
      filter: { Loopback_User_ID__c: payload.userId },
    })
    let contactId = null

    // When a user signs up with Loopback and then immediately sends a request
    // to NestJS, there will be no Salesforce Contact record for the user.
    if (contactRecords.length > 0) {
      contactId = contactRecords[0].Id
    }

    return { loopbackUserId: payload.userId, contactId }
  }
}
