import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import {
  CompanyTalentPoolState,
  TpCompanyProfileEntity,
} from '@talent-connect/common-types'
import {
  SalesforceRecordEvents,
  TpCompanyProfileStatusChangedInternalEventDto,
} from '@talent-connect/salesforce-record-events'
import { EmailService } from '../email/email.service'
import { TpCompanyProfilesService } from './tp-company-profiles.service'
import { TpCompanyRepresentativeRelationshipsService } from './tp-company-representative-relationships.service'

@Injectable()
export class TpCompanyProfilesSalesforceEventHandlerService {
  constructor(
    private readonly service: TpCompanyProfilesService,
    private readonly emailService: EmailService,
    private readonly companyRepresentativesService: TpCompanyRepresentativeRelationshipsService
  ) {}

  @OnEvent(SalesforceRecordEvents.TpAccountTalentPoolStatusChanged)
  async handleTpCompanyProfileStatusChanged(
    payload: TpCompanyProfileStatusChangedInternalEventDto
  ) {
    console.log(
      '[TpCompanyProfilesSalesforceEventHandlerService]',
      'handleTpCompanyProfileStatusChanged event handler triggered for accountId:',
      payload.tpCompanyProfileId
    )

    const isStatusChangedToApproved =
      payload.newStatus === CompanyTalentPoolState.PROFILE_APPROVED &&
      payload.oldStatus !== payload.newStatus

    if (isStatusChangedToApproved) {
      const companyProfile = await this.service.findOneById(
        payload.tpCompanyProfileId
      )
      const updatedCompanyProfileProps = Object.assign(
        {},
        companyProfile.props,
        // Even though this function is run as a result of .status changing in Salesforce,
        // we observed that when retrieving the companyProfile from Salesforce (a few lines
        // above), companyProfile.props.status would contain the OLD value! So, when for
        // example .status was changed from DRAFTING_PROFILE to PROFILE_APPROVED by a
        // Salesforce admin, when this code ran, .status would contain DRAFTING_PROFILE.
        // We therefore need to avoid setting .status _back to_ DRAFTING_PROFILE 🤦‍♀️...
        // by setting it to the new value it's supposed to have.
        { state: payload.newStatus },
        { isProfileVisibleToJobseekers: true }
      )
      const updatedCompanyProfile = TpCompanyProfileEntity.create(
        updatedCompanyProfileProps
      )
      await this.service.update(updatedCompanyProfile)
    }
    // if the new status is not approved, we don't need to do anything else
    if (!isStatusChangedToApproved) return

    const companyRepresentatives =
      await this.companyRepresentativesService.findCompanyRepresentativesByCompany(
        payload.tpCompanyProfileId
      )

    companyRepresentatives.forEach((recipient) => {
      // TODO: add a condition here to only send the email to APPROVED representatives
      this.emailService.sendTpCompanyProfileApprovedEmail({
        recipient: recipient.props.email,
        firstName: recipient.props.firstName,
      })
    })
  }
}
