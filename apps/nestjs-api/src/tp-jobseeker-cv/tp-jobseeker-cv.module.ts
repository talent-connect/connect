import { Module } from '@nestjs/common'
import { TpJobseekerCvMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerCvResolver } from './tp-jobseeker-cv.resolver'
import { TpJobseekerCvService } from './tp-jobseeker-cv.service'

@Module({
  providers: [TpJobseekerCvResolver, TpJobseekerCvService, TpJobseekerCvMapper],
  imports: [SfApiModule],
  exports: [TpJobseekerCvService],
})
export class TpJobseekerCvModule {}
