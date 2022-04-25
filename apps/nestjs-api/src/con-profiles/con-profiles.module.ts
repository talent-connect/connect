import { Module } from '@nestjs/common'
import { ConMentoringSessionsModule } from '../con-mentoring-sessions/con-mentoring-sessions.module'
import { SalesforceApiConProfilesService } from '../salesforce-api/salesforce-api-con-profiles.service'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { ConProfilesResolver } from './con-profiles.resolver'
import { ConProfilesService } from './con-profiles.service'
import { ConProfilesMapper } from './mappers/con-profiles.mapper'

@Module({
  imports: [SalesforceApiModule, ConMentoringSessionsModule],
  providers: [ConProfilesResolver, ConProfilesService, ConProfilesMapper],
})
export class ConProfilesModule {}
