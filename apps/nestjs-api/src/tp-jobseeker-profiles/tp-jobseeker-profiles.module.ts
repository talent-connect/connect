import { Module } from '@nestjs/common'
import { TpJobseekerProfileMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerProfilesResolver } from './tp-jobseeker-profiles.resolver'
import { TpJobseekerProfilesService } from './tp-jobseeker-profiles.service'

@Module({
  providers: [
    TpJobseekerProfilesResolver,
    TpJobseekerProfilesService,
    TpJobseekerProfileMapper,
  ],
  imports: [SfApiModule],
  exports: [TpJobseekerProfilesService],
})
export class TpJobseekerProfilesModule {}
