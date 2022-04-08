import { Module } from '@nestjs/common'
import { ConProfilesService } from './con-profiles.service'
import { ConProfilesResolver } from './con-profiles.resolver'
import { ConProfilesRepository } from './con-profiles.repository'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'

@Module({
  imports: [SalesforceApiModule],
  providers: [ConProfilesResolver, ConProfilesService, ConProfilesRepository],
})
export class ConProfilesModule {}
