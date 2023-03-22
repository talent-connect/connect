import { Module } from '@nestjs/common'
import { TpJobseekerProfileMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { UserContactModule } from '../user-contact/user-contact.module'
import { TpJobseekerProfileResolver } from './tp-jobseeker-profile.resolver'
import { TpJobseekerProfileService } from './tp-jobseeker-profile.service'

@Module({
  providers: [
    TpJobseekerProfileResolver,
    TpJobseekerProfileService,
    TpJobseekerProfileMapper,
  ],
  imports: [SfApiModule, UserContactModule],
  exports: [TpJobseekerProfileService],
})
export class TpJobseekerProfileModule {}
