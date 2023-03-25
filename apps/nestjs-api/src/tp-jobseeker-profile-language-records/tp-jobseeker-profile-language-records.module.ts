import { Module } from '@nestjs/common'
import { TpJobseekerProfileLanguageRecordMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerProfileModule } from '../tp-jobseeker-profile/tp-jobseeker-profile.module'
import { TpJobseekerProfileLanguageRecordResolver } from './tp-jobseeker-profile-language-records.resolver'
import { TpJobseekerProfileLanguageRecordsService } from './tp-jobseeker-profile-language-records.service'

@Module({
  providers: [
    TpJobseekerProfileLanguageRecordMapper,
    TpJobseekerProfileLanguageRecordResolver,
    TpJobseekerProfileLanguageRecordsService,
  ],
  imports: [SfApiModule, TpJobseekerProfileModule],
  exports: [TpJobseekerProfileLanguageRecordsService],
})
export class TpJobseekerProfileLanguageRecordsModule {}
