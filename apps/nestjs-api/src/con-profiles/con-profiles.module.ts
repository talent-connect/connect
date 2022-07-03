import { Module, forwardRef } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { ConMentoringSessionsModule } from '../con-mentoring-sessions/con-mentoring-sessions.module'
import { ConMentorshipMatchesModule } from '../con-mentorship-matches/con-mentorship-matches.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { ConProfilesResolver } from './con-profiles.resolver'
import { ConProfilesService } from './con-profiles.service'
import { ConProfileMapper } from './mappers/con-profile.mapper'

@Module({
  imports: [
    AuthModule,
    SfApiModule,
    ConMentoringSessionsModule,
    forwardRef(() => ConMentorshipMatchesModule),
  ],
  providers: [ConProfilesResolver, ConProfilesService, ConProfileMapper],
  exports: [ConProfilesService],
})
export class ConProfilesModule {}
