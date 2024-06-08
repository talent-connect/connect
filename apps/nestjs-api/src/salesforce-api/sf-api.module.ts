import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SfApiConMentoringSessionsService } from './sf-api-con-mentoring-sessions.service'
import { SfApiConMentorshipMatchesService } from './sf-api-con-mentorship-matches.service'
import { SfApiConProfilesService } from './sf-api-con-profiles.service'
import { SfApiContactService } from './sf-api-contact.service'
import { SfApiEmailTemplatesService } from './sf-api-email-templates.service'
import { SfApiTpCompanyProfilesService } from './sf-api-tp-company-profiles.service'
import { SfApiTpJobListingsService } from './sf-api-tp-job-listings.service'
import { SfApiTpJobseekerCvEducationRecordsService } from './sf-api-tp-jobseeker-cv-education-records.service'
import { SfApiTpJobseekerCvExperienceRecordsService } from './sf-api-tp-jobseeker-cv-experience-records.service'
import { SfApiTpJobseekerCvLanguageRecordsService } from './sf-api-tp-jobseeker-cv-language-records.service'
import { SfApiTpJobseekerCvService } from './sf-api-tp-jobseeker-cv.service'
import { SfApiTpJobseekerDirectoryEntriesService } from './sf-api-tp-jobseeker-directory-entries.service'
import { SfApiTpJobseekerProfileEducationRecordsService } from './sf-api-tp-jobseeker-profile-education-records.service'
import { SfApiTpJobseekerProfileExperienceRecordsService } from './sf-api-tp-jobseeker-profile-experience-records.service'
import { SfApiTpContactLanguageRecordsService } from './sf-api-tp-jobseeker-profile-language-records.service'
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
    SfApiTpJobseekerProfileEducationRecordsService,
    SfApiTpJobseekerProfileExperienceRecordsService,
    SfApiTpContactLanguageRecordsService,
    SfApiTpJobseekerCvService,
    SfApiTpJobseekerCvEducationRecordsService,
    SfApiTpJobseekerCvExperienceRecordsService,
    SfApiTpJobseekerCvLanguageRecordsService,
    SfApiEmailTemplatesService,
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
    SfApiTpJobseekerProfileEducationRecordsService,
    SfApiTpJobseekerProfileExperienceRecordsService,
    SfApiTpContactLanguageRecordsService,
    SfApiTpJobseekerCvService,
    SfApiTpJobseekerCvEducationRecordsService,
    SfApiTpJobseekerCvExperienceRecordsService,
    SfApiTpJobseekerCvLanguageRecordsService,
    SfApiEmailTemplatesService,
  ],
})
export class SfApiModule {}
