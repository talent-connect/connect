import { Module } from '@nestjs/common'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { ConMentoringSessionsResolver } from './con-mentorship-matches.resolver'
import { ConMentoringSessionsService } from './con-mentorship-matches.service'
import { ConMentoringSessionsMapper } from './mappers/con-mentoring-sessions.mapper'

@Module({
  imports: [SalesforceApiModule],
  providers: [
    ConMentoringSessionsResolver,
    ConMentoringSessionsService,
    ConMentoringSessionsMapper,
  ],
  exports: [ConMentoringSessionsService],
})
export class ConMentoringSessionsModule {}
