import { Module } from '@nestjs/common'
import { TpJobseekerProfileEducationRecordMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerProfileModule } from '../tp-jobseeker-profile/tp-jobseeker-profile.module'
import { TpJobseekerProfileEducationRecordResolver } from './tp-jobseeker-profile-education-records.resolver'
import { TpJobseekerProfileEducationRecordsService } from './tp-jobseeker-profile-education-records.service'

@Module({
  providers: [
    TpJobseekerProfileEducationRecordMapper,
    TpJobseekerProfileEducationRecordResolver,
    TpJobseekerProfileEducationRecordsService,
  ],
  imports: [SfApiModule, TpJobseekerProfileModule],
  exports: [TpJobseekerProfileEducationRecordsService],
})
export class TpJobseekerProfileEducationRecordsModule {}
