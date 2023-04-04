import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { JobseekerProfileStatus } from '@talent-connect/common-types'
import {
  SalesforceRecordEvents,
  TpJobseekerProfileStatusChangedInternalEventDto,
} from '@talent-connect/salesforce-record-events'
import { EmailService } from '../email/email.service'
import { UserContactService } from '../user-contact/user-contact.service'
import { TpJobseekerProfileService } from './tp-jobseeker-profile.service'

@Injectable()
export class TpJobseekerProfileSalesforceEventHandlerService {
  constructor(
    private readonly service: TpJobseekerProfileService,
    private readonly userContactService: UserContactService,
    private readonly emailService: EmailService
  ) {}

  @OnEvent(SalesforceRecordEvents.TpJobseekerProfileStatusChanged)
  async handleJobseekerProfileStatusChanged(
    payload: TpJobseekerProfileStatusChangedInternalEventDto
  ) {
    console.log(
      '[TpJobseekerProfileSalesforceEventHandlerService]',
      'handleJobseekerProfileStatusChanged event handler triggered for tpJobseekerProfileId:',
      payload.tpJobseekerProfileId
    )

    const didStatusChangeIntoApproved =
      payload.newStatus === JobseekerProfileStatus.PROFILE_APPROVED &&
      payload.oldStatus !== payload.newStatus

    // if the new status is not approved, we don't need to do anything else
    if (!didStatusChangeIntoApproved) return

    const jobseekerProfile = await this.service.findOne(
      payload.tpJobseekerProfileId
    )
    const userContact = await this.userContactService.findOneById(
      jobseekerProfile.props.userId
    )

    this.emailService.sendJobseekerProfileApprovedEmail({
      recipient: userContact.props.email,
      firstName: userContact.props.firstName,
    })
  }
}
