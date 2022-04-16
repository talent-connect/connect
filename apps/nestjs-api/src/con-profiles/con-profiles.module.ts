import { Module } from '@nestjs/common'
import { SalesforceApiConProfilesService } from '../salesforce-api/salesforce-api-con-profiles.service'
import { ConProfilesResolver } from './con-profiles.resolver'
import { ConProfilesService } from './con-profiles.service'
import { ConProfilesMapper } from './mappers/con-profiles.mapper'

@Module({
  imports: [SalesforceApiConProfilesService],
  providers: [ConProfilesResolver, ConProfilesService, ConProfilesMapper],
})
export class ConProfilesModule {}
