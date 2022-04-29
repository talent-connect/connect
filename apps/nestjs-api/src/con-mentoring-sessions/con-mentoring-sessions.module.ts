import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { ConMentoringSessionsResolver } from './con-mentoring-sessions.resolver'
import { ConMentoringSessionsService } from './con-mentoring-sessions.service'
import { ConMentoringSessionMapper } from './mappers/con-mentoring-session.mapper'

@Module({
  imports: [SalesforceApiModule, AuthModule],
  providers: [
    ConMentoringSessionsResolver,
    ConMentoringSessionsService,
    ConMentoringSessionMapper,
  ],
  exports: [ConMentoringSessionsService],
})
export class ConMentoringSessionsModule {}
