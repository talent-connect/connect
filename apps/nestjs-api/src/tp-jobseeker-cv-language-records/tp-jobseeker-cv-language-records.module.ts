import { Module } from '@nestjs/common'
import { TpJobseekerCvLanguageRecordMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerCvModule } from '../tp-jobseeker-cv/tp-jobseeker-cv.module'
import { TpJobseekerCvLanguageRecordResolver } from './tp-jobseeker-cv-language-records.resolver'
import { TpJobseekerCvLanguageRecordsService } from './tp-jobseeker-cv-language-records.service'

@Module({
  providers: [
    TpJobseekerCvLanguageRecordMapper,
    TpJobseekerCvLanguageRecordResolver,
    TpJobseekerCvLanguageRecordsService,
  ],
  imports: [SfApiModule, TpJobseekerCvModule],
  exports: [],
})
export class TpJobseekerCvLanguageRecordsModule {}
