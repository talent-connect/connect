import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import {
  ConProfileEntity,
  ConnectProfileStatus,
  UserType,
} from '@talent-connect/common-types'
import {
  ConProfileCreatedInternalEventDto,
  ConProfileStatusChangedInternalEventDto,
  SalesforceRecordEvents,
} from '@talent-connect/salesforce-record-events'
import { EmailService } from '../email/email.service'
import { ConProfilesService } from './con-profiles.service'

@Injectable()
export class ConProfilesSalesforceEventHandlerService {
  constructor(
    private readonly service: ConProfilesService,
    private readonly emailService: EmailService
  ) {}

  @OnEvent(SalesforceRecordEvents.ConProfileStatusChanged)
  async handleConProfileStatusChanged(
    payload: ConProfileStatusChangedInternalEventDto
  ) {
    console.log(
      'ConProfileStatusChanged handler trigger for conProfileId:',
      payload.conProfileId
    )

    const isStatusPendingToApproved =
      payload.oldStatus === ConnectProfileStatus.PENDING &&
      payload.newStatus === ConnectProfileStatus.APPROVED
    const isStatusPendingToRejected =
      payload.oldStatus === ConnectProfileStatus.PENDING &&
      payload.newStatus === ConnectProfileStatus.REJECTED

    if (isStatusPendingToApproved) {
      const conProfile = await this.service.findOneById(payload.conProfileId)
      const updatedConProfileProps = Object.assign({}, conProfile.props, {
        userActivatedAt: new Date().toISOString(),
      })
      await this.service.update(ConProfileEntity.create(updatedConProfileProps))
    }

    const conProfile = await this.service.findOneById(payload.conProfileId)
    switch (conProfile.props.userType) {
      case UserType.MENTEE:
        if (isStatusPendingToApproved)
          this.emailService.sendMenteePendingReviewAcceptedEmail({
            recipient: conProfile.props.email,
            firstName: conProfile.props.firstName,
            rediLocation: conProfile.props.rediLocation,
          })
        if (isStatusPendingToRejected)
          this.emailService.sendPendingReviewDeclinedEmail({
            recipient: conProfile.props.email,
            firstName: conProfile.props.firstName,
            userType: conProfile.props.userType,
          })
        break

      case UserType.MENTOR:
        if (isStatusPendingToApproved)
          this.emailService.sendMentorPendingReviewAcceptedEmail({
            recipient: conProfile.props.email,
            firstName: conProfile.props.firstName,
            rediLocation: conProfile.props.rediLocation,
          })
        if (isStatusPendingToRejected)
          this.emailService.sendPendingReviewDeclinedEmail({
            recipient: conProfile.props.email,
            firstName: conProfile.props.firstName,
            userType: conProfile.props.userType,
          })
        break
    }
  }

  @OnEvent(SalesforceRecordEvents.ConProfileCreated)
  async handleConProfileCreated(payload: ConProfileCreatedInternalEventDto) {
    console.log(
      'ConProfileCreated handler trigger for conProfileId:',
      payload.conProfileId
    )

    const conProfile = await this.service.findOneById(payload.conProfileId)
    switch (conProfile.props.userType) {
      case UserType.MENTEE:
        this.emailService.sendMenteeSignupCompleteEmail({
          recipient: conProfile.props.email,
          firstName: conProfile.props.firstName,
        })
        break

      case UserType.MENTOR:
        this.emailService.sendMentorSignupCompleteEmail({
          recipient: conProfile.props.email,
          firstName: conProfile.props.firstName,
        })
        break
    }
  }
}
