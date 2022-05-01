import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SfApiConMentoringSessionsService } from './sf-api-con-mentoring-sessions.service'
import { SfApiConMentorshipMatchesService } from './sf-api-con-mentorship-matches.service'
import { SfApiConProfilesService } from './sf-api-con-profiles.service'
import { SfApiTpCompanyProfilesService } from './sf-api-tp-company-profiles.service'
import { SfApiRepository } from './sf-api.repository'

@Module({
  providers: [
    SfApiConProfilesService,
    SfApiConMentoringSessionsService,
    SfApiConMentorshipMatchesService,
    SfApiRepository,
    SfApiTpCompanyProfilesService,
  ],
  imports: [ConfigModule],
  exports: [
    SfApiConProfilesService,
    SfApiConMentoringSessionsService,
    SfApiConMentorshipMatchesService,
    //! TODO: this was hack - remote this export
    SfApiRepository,
    SfApiTpCompanyProfilesService,
  ],
})
export class SfApiModule {}
