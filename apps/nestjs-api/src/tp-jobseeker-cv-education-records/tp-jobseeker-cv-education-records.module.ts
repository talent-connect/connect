import { Module } from '@nestjs/common'
import { TpJobseekerCvEducationRecordMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerCvModule } from '../tp-jobseeker-cv/tp-jobseeker-cv.module'
import { TpJobseekerCvEducationRecordResolver } from './tp-jobseeker-cv-education-records.resolver'
import { TpJobseekerCvEducationRecordsService } from './tp-jobseeker-cv-education-records.service'

@Module({
  providers: [
    TpJobseekerCvEducationRecordMapper,
    TpJobseekerCvEducationRecordResolver,
    TpJobseekerCvEducationRecordsService,
  ],
  imports: [SfApiModule, TpJobseekerCvModule],
  exports: [],
})
export class TpJobseekerCvEducationRecordsModule {}
