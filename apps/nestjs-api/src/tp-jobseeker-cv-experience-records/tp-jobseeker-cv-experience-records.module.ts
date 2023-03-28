import { Module } from '@nestjs/common'
import { TpJobseekerCvExperienceRecordMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerCvExperienceRecordResolver } from './tp-jobseeker-cv-experience-records.resolver'
import { TpJobseekerCvExperienceRecordsService } from './tp-jobseeker-cv-experience-records.service'

@Module({
  providers: [
    TpJobseekerCvExperienceRecordMapper,
    TpJobseekerCvExperienceRecordResolver,
    TpJobseekerCvExperienceRecordsService,
  ],
  imports: [SfApiModule],
  exports: [TpJobseekerCvExperienceRecordsService],
})
export class TpJobseekerCvExperienceRecordsModule {}
