import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SalesforceApiConMentoringSessionsService } from './salesforce-api-con-mentoring-sessions.service'
import { SalesforceApiConMentorshipMatchesService } from './salesforce-api-con-mentorship-matches.service'
import { SalesforceApiConProfilesService } from './salesforce-api-con-profiles.service'
import { SalesforceApiRepository } from './salesforce-api.repository'

@Module({
  providers: [
    SalesforceApiConProfilesService,
    SalesforceApiConMentoringSessionsService,
    SalesforceApiConMentorshipMatchesService,
    SalesforceApiRepository,
  ],
  imports: [ConfigModule],
  exports: [
    SalesforceApiConProfilesService,
    SalesforceApiConMentoringSessionsService,
    SalesforceApiConMentorshipMatchesService,
    //! TODO: this was hack - remote this export
    SalesforceApiRepository,
  ],
})
export class SalesforceApiModule {}
