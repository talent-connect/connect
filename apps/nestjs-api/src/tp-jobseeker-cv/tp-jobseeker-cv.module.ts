import { forwardRef, Module } from '@nestjs/common'
import { TpJobseekerCvMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerCvEducationRecordsModule } from '../tp-jobseeker-cv-education-records/tp-jobseeker-cv-education-records.module'
import { TpJobseekerCvExperienceRecordsModule } from '../tp-jobseeker-cv-experience-records/tp-jobseeker-cv-experience-records.module'
import { TpJobseekerCvLanguageRecordsModule } from '../tp-jobseeker-cv-language-records/tp-jobseeker-cv-language-records.module'
import { TpJobseekerProfileEducationRecordsModule } from '../tp-jobseeker-profile-education-records/tp-jobseeker-profile-education-records.module'
import { TpJobseekerProfileExperienceRecordsModule } from '../tp-jobseeker-profile-experience-records/tp-jobseeker-profile-experience-records.module'
import { TpJobseekerProfileLanguageRecordsModule } from '../tp-jobseeker-profile-language-records/tp-jobseeker-profile-language-records.module'
import { TpJobseekerProfileModule } from '../tp-jobseeker-profile/tp-jobseeker-profile.module'
import { TpJobseekerCvResolver } from './tp-jobseeker-cv.resolver'
import { TpJobseekerCvService } from './tp-jobseeker-cv.service'

@Module({
  providers: [TpJobseekerCvResolver, TpJobseekerCvService, TpJobseekerCvMapper],
  imports: [
    SfApiModule,
    TpJobseekerProfileModule,
    forwardRef(() => TpJobseekerCvEducationRecordsModule),
    forwardRef(() => TpJobseekerCvExperienceRecordsModule),
    forwardRef(() => TpJobseekerCvLanguageRecordsModule),
    forwardRef(() => TpJobseekerProfileEducationRecordsModule),
    forwardRef(() => TpJobseekerProfileExperienceRecordsModule),
    forwardRef(() => TpJobseekerProfileLanguageRecordsModule),
  ],
  exports: [TpJobseekerCvService],
})
export class TpJobseekerCvModule {}
