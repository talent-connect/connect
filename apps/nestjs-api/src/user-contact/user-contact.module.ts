import { Module } from '@nestjs/common'
import { UserContactMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { UserContactResolver } from './user-contact.resolver'
import { UserContactService } from './user-contact.service'

@Module({
  providers: [UserContactService, UserContactResolver, UserContactMapper],
  imports: [SfApiModule],
  exports: [UserContactService],
})
export class UserContactModule {}
