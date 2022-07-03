import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { ConMentoringSessionsModule } from '../con-mentoring-sessions/con-mentoring-sessions.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { ConMentorshipMatchesResolver } from './con-mentorship-matches.resolver'
import { ConMentorshipMatchesService } from './con-mentorship-matches.service'
import { ConMentorshipMatchMapper } from './mappers/con-mentorship-match.mapper'

@Module({
  imports: [
    SfApiModule,
    ConMentoringSessionsModule,
    forwardRef(() => ConProfilesModule),
    AuthModule,
  ],
  providers: [
    ConMentorshipMatchesResolver,
    ConMentorshipMatchesService,
    ConMentorshipMatchMapper,
  ],
  exports: [ConMentorshipMatchesService],
})
export class ConMentorshipMatchesModule {}
