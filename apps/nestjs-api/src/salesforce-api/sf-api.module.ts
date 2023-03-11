import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SfApiConMentoringSessionsService } from './sf-api-con-mentoring-sessions.service'
import { SfApiConMentorshipMatchesService } from './sf-api-con-mentorship-matches.service'
import { SfApiConProfilesService } from './sf-api-con-profiles.service'
import { SfApiContactService } from './sf-api-contact.service'
import { SfApiTpCompanyProfilesService } from './sf-api-tp-company-profiles.service'
import { SfApiTpJobListingsService } from './sf-api-tp-job-listings.service'
import { SfApiTpJobseekerDirectoryEntriesService } from './sf-api-tp-jobseeker-directory-entries.service'
import { SfApiTpJobseekerProfileService } from './sf-api-tp-jobseeker-profile.service'
import { SfApiRepository } from './sf-api.repository'

@Module({
  providers: [
    SfApiConProfilesService,
    SfApiConMentoringSessionsService,
    SfApiConMentorshipMatchesService,
    SfApiRepository,
    SfApiTpCompanyProfilesService,
    SfApiTpJobseekerProfileService,
    SfApiTpJobseekerDirectoryEntriesService,
    SfApiTpJobListingsService,
    SfApiContactService,
  ],
  imports: [ConfigModule, CacheModule.register()],
  exports: [
    SfApiConProfilesService,
    SfApiConMentoringSessionsService,
    SfApiConMentorshipMatchesService,
    //! TODO: this was hack - remote this export
    SfApiRepository,
    SfApiTpCompanyProfilesService,
    SfApiTpJobseekerProfileService,
    SfApiTpJobseekerDirectoryEntriesService,
    SfApiTpJobListingsService,
    SfApiContactService,
  ],
})
export class SfApiModule {}
