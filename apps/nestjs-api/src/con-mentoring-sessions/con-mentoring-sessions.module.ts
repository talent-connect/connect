import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { EmailModule } from '../email/email.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { ConMentoringSessionsResolver } from './con-mentoring-sessions.resolver'
import { ConMentoringSessionsService } from './con-mentoring-sessions.service'

@Module({
  imports: [
    SfApiModule,
    AuthModule,
    EmailModule,
    forwardRef(() => ConProfilesModule),
  ],
  providers: [ConMentoringSessionsResolver, ConMentoringSessionsService],
  exports: [ConMentoringSessionsService],
})
export class ConMentoringSessionsModule {}
