import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SalesforceApiRepository } from '../salesforce-api/salesforce-api.repository'
import { CurrentUserInfo } from './current-user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly salesforceRepository: SalesforceApiRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('NX_JWT_SECRET'),
    })
  }

  //! TODO: access this properly via a service...
  async validate(payload: any): Promise<CurrentUserInfo> {
    const contactRecords = await this.salesforceRepository.findRecordsOfObject({
      objectName: 'Contact',
      objectFields: ['Id'],
      filter: { Loopback_User_ID__c: payload.userId },
    })
    if (contactRecords.length === 0) {
      throw new InternalServerErrorException('SF Contact for user not found')
    }
    //! TODO: introduce caching here, this is a lot of simple loolups
    // for something that will never change. Can DataLoader fix it?
    const contact = contactRecords[0]
    return { userId: payload.userId, contactId: contact.Id }
  }
}
