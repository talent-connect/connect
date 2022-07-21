import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { EmailModule } from '../email/email.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { ConMentoringSessionsResolver } from './con-mentoring-sessions.resolver'
import { ConMentoringSessionsService } from './con-mentoring-sessions.service'
import { ConMentoringSessionMapper } from './mappers/con-mentoring-session.mapper'

@Module({
  imports: [
    SfApiModule,
    AuthModule,
    EmailModule,
    forwardRef(() => ConProfilesModule),
  ],
  providers: [
    ConMentoringSessionsResolver,
    ConMentoringSessionsService,
    ConMentoringSessionMapper,
  ],
  exports: [ConMentoringSessionsService],
})
export class ConMentoringSessionsModule {}
