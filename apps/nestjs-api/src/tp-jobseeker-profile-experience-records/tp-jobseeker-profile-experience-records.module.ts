import { Module } from '@nestjs/common'
import { TpJobseekerProfileExperienceRecordMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerProfileModule } from '../tp-jobseeker-profile/tp-jobseeker-profile.module'
import { TpJobseekerProfileExperienceRecordResolver } from './tp-jobseeker-profile-experience-records.resolver'
import { TpJobseekerProfileExperienceRecordsService } from './tp-jobseeker-profile-experience-records.service'

@Module({
  providers: [
    TpJobseekerProfileExperienceRecordMapper,
    TpJobseekerProfileExperienceRecordResolver,
    TpJobseekerProfileExperienceRecordsService,
  ],
  imports: [SfApiModule, TpJobseekerProfileModule],
  exports: [TpJobseekerProfileExperienceRecordsService],
})
export class TpJobseekerProfileExperienceRecordsModule {}
