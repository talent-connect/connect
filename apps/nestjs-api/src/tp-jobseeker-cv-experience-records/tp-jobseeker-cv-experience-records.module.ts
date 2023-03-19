import { Module } from '@nestjs/common'
import { TpJobseekerCvExperienceRecordMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerCvModule } from '../tp-jobseeker-cv/tp-jobseeker-cv.module'
import { TpJobseekerCvExperienceRecordResolver } from './tp-jobseeker-cv-experience-records.resolver'
import { TpJobseekerCvExperienceRecordsService } from './tp-jobseeker-cv-experience-records.service'

@Module({
  providers: [
    TpJobseekerCvExperienceRecordMapper,
    TpJobseekerCvExperienceRecordResolver,
    TpJobseekerCvExperienceRecordsService,
  ],
  imports: [SfApiModule, TpJobseekerCvModule],
  exports: [],
})
export class TpJobseekerCvExperienceRecordsModule {}
