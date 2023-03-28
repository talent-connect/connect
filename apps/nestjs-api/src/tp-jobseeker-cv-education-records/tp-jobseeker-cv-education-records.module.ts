import { Module } from '@nestjs/common'
import { TpJobseekerCvEducationRecordMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerCvEducationRecordResolver } from './tp-jobseeker-cv-education-records.resolver'
import { TpJobseekerCvEducationRecordsService } from './tp-jobseeker-cv-education-records.service'

@Module({
  providers: [
    TpJobseekerCvEducationRecordMapper,
    TpJobseekerCvEducationRecordResolver,
    TpJobseekerCvEducationRecordsService,
  ],
  imports: [SfApiModule],
  exports: [TpJobseekerCvEducationRecordsService],
})
export class TpJobseekerCvEducationRecordsModule {}
