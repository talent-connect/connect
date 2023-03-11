import { Module } from '@nestjs/common'
import { TpJobseekerProfileMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerProfileResolver } from './tp-jobseeker-profile.resolver'
import { TpJobseekerProfileService } from './tp-jobseeker-profile.service'

@Module({
  providers: [
    TpJobseekerProfileResolver,
    TpJobseekerProfileService,
    TpJobseekerProfileMapper,
  ],
  imports: [SfApiModule],
  exports: [TpJobseekerProfileService],
})
export class TpJobseekerProfileModule {}
