import { Module } from '@nestjs/common'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerProfilesResolver } from './tp-jobseeker-profiles.resolver'
import { TpJobseekerProfilesService } from './tp-jobseeker-profiles.service'

@Module({
  providers: [TpJobseekerProfilesResolver, TpJobseekerProfilesService],
  imports: [SfApiModule],
})
export class TpJobseekerProfilesModule {}
