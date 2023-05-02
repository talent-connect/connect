import { forwardRef, Module } from '@nestjs/common'
import {
  TpJobseekerCvEducationRecordMapper,
  TpJobseekerCvExperienceRecordMapper,
  TpJobseekerCvLanguageRecordMapper,
  TpJobseekerCvMapper,
} from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerProfileEducationRecordsModule } from '../tp-jobseeker-profile-education-records/tp-jobseeker-profile-education-records.module'
import { TpJobseekerProfileExperienceRecordsModule } from '../tp-jobseeker-profile-experience-records/tp-jobseeker-profile-experience-records.module'
import { TpJobseekerProfileLanguageRecordsModule } from '../tp-jobseeker-profile-language-records/tp-jobseeker-profile-language-records.module'
import { TpJobseekerProfileModule } from '../tp-jobseeker-profile/tp-jobseeker-profile.module'
import { TpJobseekerCvEducationRecordResolver } from './tp-jobseeker-cv-education-records/tp-jobseeker-cv-education-records.resolver'
import { TpJobseekerCvEducationRecordsService } from './tp-jobseeker-cv-education-records/tp-jobseeker-cv-education-records.service'
import { TpJobseekerCvExperienceRecordResolver } from './tp-jobseeker-cv-experience-records/tp-jobseeker-cv-experience-records.resolver'
import { TpJobseekerCvExperienceRecordsService } from './tp-jobseeker-cv-experience-records/tp-jobseeker-cv-experience-records.service'
import { TpJobseekerCvLanguageRecordResolver } from './tp-jobseeker-cv-language-records/tp-jobseeker-cv-language-records.resolver'
import { TpJobseekerCvLanguageRecordsService } from './tp-jobseeker-cv-language-records/tp-jobseeker-cv-language-records.service'
import { TpJobseekerCvReadService } from './tp-jobseeker-cv.read.service'
import { TpJobseekerCvResolver } from './tp-jobseeker-cv.resolver'
import { TpJobseekerCvWriteService } from './tp-jobseeker-cv.write.service'

@Module({
  providers: [
    TpJobseekerCvResolver,
    TpJobseekerCvEducationRecordResolver,
    TpJobseekerCvExperienceRecordResolver,
    TpJobseekerCvLanguageRecordResolver,
    TpJobseekerCvWriteService,
    TpJobseekerCvReadService,
    TpJobseekerCvMapper,
    TpJobseekerCvEducationRecordMapper,
    TpJobseekerCvExperienceRecordMapper,
    TpJobseekerCvLanguageRecordMapper,
    TpJobseekerCvEducationRecordsService,
    TpJobseekerCvExperienceRecordsService,
    TpJobseekerCvLanguageRecordsService,
  ],
  imports: [
    SfApiModule,
    TpJobseekerProfileModule,
    forwardRef(() => TpJobseekerProfileEducationRecordsModule),
    forwardRef(() => TpJobseekerProfileExperienceRecordsModule),
    forwardRef(() => TpJobseekerProfileLanguageRecordsModule),
  ],
  exports: [TpJobseekerCvWriteService],
})
export class TpJobseekerCvModule {}
