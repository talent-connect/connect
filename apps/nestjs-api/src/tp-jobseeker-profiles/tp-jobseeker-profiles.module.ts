import { Module } from '@nestjs/common'
import { TpJobseekerProfilesResolver } from './tp-jobseeker-profiles.resolver'
import { TpJobseekerProfilesService } from './tp-jobseeker-profiles.service'

@Module({
  providers: [TpJobseekerProfilesResolver, TpJobseekerProfilesService],
})
export class TpJobseekerProfilesModule {}
