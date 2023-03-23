import { Module } from '@nestjs/common'
import { TpJobseekerProfileMapper } from '@talent-connect/common-types'
import { EmailModule } from '../email/email.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { UserContactModule } from '../user-contact/user-contact.module'
import { TpJobseekerProfileSalesforceEventHandlerService } from './tp-jobseeker-profile-salesforce-event-handler.service'
import { TpJobseekerProfileResolver } from './tp-jobseeker-profile.resolver'
import { TpJobseekerProfileService } from './tp-jobseeker-profile.service'

@Module({
  providers: [
    TpJobseekerProfileResolver,
    TpJobseekerProfileService,
    TpJobseekerProfileMapper,
    TpJobseekerProfileSalesforceEventHandlerService,
  ],
  imports: [SfApiModule, UserContactModule, EmailModule],
  exports: [TpJobseekerProfileService],
})
export class TpJobseekerProfileModule {}
