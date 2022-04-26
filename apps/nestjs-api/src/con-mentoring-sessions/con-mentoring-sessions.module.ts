import { Module } from '@nestjs/common'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { ConMentoringSessionsResolver } from './con-mentoring-sessions.resolver'
import { ConMentoringSessionsService } from './con-mentoring-sessions.service'
import { ConMentoringSessionMapper } from './mappers/con-mentoring-session.mapper'

@Module({
  imports: [SalesforceApiModule],
  providers: [
    ConMentoringSessionsResolver,
    ConMentoringSessionsService,
    ConMentoringSessionMapper,
  ],
  exports: [ConMentoringSessionsService],
})
export class ConMentoringSessionsModule {}
