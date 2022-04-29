import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { ConMentorshipMatchesResolver } from './con-mentorship-matches.resolver'
import { ConMentorshipMatchesService } from './con-mentorship-matches.service'
import { ConMentorshipMatchMapper } from './mappers/con-mentorship-match.mapper'

@Module({
  imports: [SalesforceApiModule, ConProfilesModule, AuthModule],
  providers: [
    ConMentorshipMatchesResolver,
    ConMentorshipMatchesService,
    ConMentorshipMatchMapper,
  ],
  exports: [ConMentorshipMatchesService],
})
export class ConMentorshipMatchesModule {}
