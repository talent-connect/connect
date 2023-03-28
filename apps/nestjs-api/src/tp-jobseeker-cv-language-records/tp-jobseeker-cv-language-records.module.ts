import { Module } from '@nestjs/common'
import { TpJobseekerCvLanguageRecordMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerCvLanguageRecordResolver } from './tp-jobseeker-cv-language-records.resolver'
import { TpJobseekerCvLanguageRecordsService } from './tp-jobseeker-cv-language-records.service'

@Module({
  providers: [
    TpJobseekerCvLanguageRecordMapper,
    TpJobseekerCvLanguageRecordResolver,
    TpJobseekerCvLanguageRecordsService,
  ],
  imports: [SfApiModule],
  exports: [TpJobseekerCvLanguageRecordsService],
})
export class TpJobseekerCvLanguageRecordsModule {}
