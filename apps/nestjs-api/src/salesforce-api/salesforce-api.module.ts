import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SalesforceApiConMentoringSessionsService } from './salesforce-api-con-mentoring-sessions.service'
import { SalesforceApiConProfilesService } from './salesforce-api-con-profiles.service'
import { SalesforceApiRepository } from './salesforce-api.repository'

@Module({
  providers: [
    SalesforceApiConProfilesService,
    SalesforceApiConMentoringSessionsService,
    SalesforceApiRepository,
  ],
  imports: [ConfigModule],
  exports: [
    SalesforceApiConProfilesService,
    SalesforceApiConMentoringSessionsService,
  ],
})
export class SalesforceApiModule {}
