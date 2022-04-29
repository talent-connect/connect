import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { ConMentoringSessionsModule } from '../con-mentoring-sessions/con-mentoring-sessions.module'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { ConProfilesResolver } from './con-profiles.resolver'
import { ConProfilesService } from './con-profiles.service'
import { ConProfileMapper } from './mappers/con-profile.mapper'

@Module({
  imports: [AuthModule, SalesforceApiModule, ConMentoringSessionsModule],
  providers: [ConProfilesResolver, ConProfilesService, ConProfileMapper],
  exports: [ConProfilesService],
})
export class ConProfilesModule {}
