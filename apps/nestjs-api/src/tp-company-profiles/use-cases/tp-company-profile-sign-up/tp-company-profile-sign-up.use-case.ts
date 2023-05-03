import { Injectable } from '@nestjs/common'
import {
  AccountContactRecord,
  AccountContactRecordProps,
  ContactRecord,
  ContactRecordProps,
  TpCompanyProfileEntity,
  TpCompanyProfileMapper,
  TpCompanyRepresentativeRelationshipStatus,
} from '@talent-connect/common-types'
import { TpCompanyProfileSignUpOperationType } from 'apps/nestjs-api/src/tp-company-profiles/use-cases/tp-company-profile-sign-up/tp-company-profile-sign-up-operation-type.enum'
import { CurrentUserInfo } from '../../../auth/current-user.interface'
import { EmailService } from '../../../email/email.service'
import { SfApiTpCompanyProfilesService } from '../../../salesforce-api/sf-api-tp-company-profiles.service'
import { TpCompanyProfilesService } from '../../tp-company-profiles.service'
import {
  TpCompanyProfileSignUpMutationInputDto,
  TpCompanyProfileSignUpMutationOutputDto,
} from './tp-company-profile-sign-up.mutation-dtos'

@Injectable()
export class TpCompanyProfileSignUpUseCase {
  constructor(
    private readonly mapper: TpCompanyProfileMapper,
    private readonly sfService: SfApiTpCompanyProfilesService,
    private readonly tpCompanyProfilesSerivce: TpCompanyProfilesService,
    private readonly emailService: EmailService
  ) {}

  // TODO: use a mapper here for more elegnat conversion

  // TOOD: ugh, this whole TpCompanyProfile module, related Contact, Account
  // and AccountContact are all messy. I need to review all again, and cleanly model
  // them, along with Aggregates, Entities. I'll have to review all the CON models
  // while I'm at it.
  async execute(
    input: TpCompanyProfileSignUpMutationInputDto,
    currentUser: CurrentUserInfo
  ): Promise<TpCompanyProfileSignUpMutationOutputDto> {
    const [companyEntity, contactRecord] = await Promise.all([
      this.findOrCreateCompanyByName(
        input.companyIdOrName,
        input.operationType,
        input.isMicrosoftPartner
      ),
      this.updateCurrentUserContact(input, currentUser),
    ])

    await this.createAccountContactRelationship(
      input,
      companyEntity,
      currentUser
    )

    switch (input.operationType) {
      case TpCompanyProfileSignUpOperationType.NEW_COMPANY:
        this.emailService.sendCompanySignupForNewCompanyCompleteEmail({
          recipient: currentUser.userProps.email,
          firstName: contactRecord.props.FirstName,
        })
        break

      case TpCompanyProfileSignUpOperationType.EXISTING_COMPANY:
        this.emailService.sendCompanySignupForExistingCompanyCompleteEmail({
          recipient: currentUser.userProps.email,
          firstName: contactRecord.props.FirstName,
          companyName: companyEntity.props.companyName,
        })
        break
    }

    return { ok: true }
  }

  async findOrCreateCompanyByName(
    companyIdOrName: string,
    operationType: TpCompanyProfileSignUpOperationType,
    isMicrosoftPartner: boolean
  ): Promise<TpCompanyProfileEntity> {
    let companyEntity: TpCompanyProfileEntity

    console.log(
      '[TpCompanyProfileSignUpUseCase]',
      'creating new company or getting existing one'
    )

    if (
      operationType === TpCompanyProfileSignUpOperationType.EXISTING_COMPANY
    ) {
      companyEntity = await this.tpCompanyProfilesSerivce.findOneById(
        companyIdOrName
      )

      console.log(
        '[TpCompanyProfileSignUpUseCase]',
        'found existing company',
        companyEntity.props.id
      )
    } else {
      const accountRecord = await this.sfService.createAccount(
        companyIdOrName,
        isMicrosoftPartner
      )
      companyEntity = this.mapper.fromPersistence(accountRecord)
      console.log(
        '[TpCompanyProfileSignUpUseCase]',
        'created new company',
        companyEntity.props.id
      )
    }

    return companyEntity
  }

  async updateCurrentUserContact(
    input: TpCompanyProfileSignUpMutationInputDto,
    currentUser: CurrentUserInfo
  ) {
    const contactRecordProps = new ContactRecordProps()
    contactRecordProps.Id = currentUser.userId
    contactRecordProps.FirstName = input.firstName
    contactRecordProps.LastName = input.lastName
    contactRecordProps.ReDI_First_Point_of_Contact_Other_TP__c =
      input.firstPointOfContactOther
    contactRecordProps.ReDI_First_Point_of_Contact_Talent_Pool__c =
      input.firstPointOfContact
    contactRecordProps.Loopback_User_ID__c = currentUser.loopbackUserId

    // INFO: it might seem counterintuitive to UPDATE a Contact record here,
    // instead of rather creating a new one. This is due to a abstraction. The
    // resolver that calls this use case (TpCompanyProfilesResolver) is
    // protected by GqlJwtAuthGuard. It currently auto-creates a Contact
    // record if it doesn't find one. Arguably, this violates SRP, and we might
    // TODO want to do replace this later on.
    const contactRecord = await this.sfService.updateContact(
      ContactRecord.create(contactRecordProps)
    )

    console.log(
      '[TpCompanyProfileSignUpUseCase]',
      'updated contact record',
      contactRecord.props.Id
    )

    return contactRecord
  }

  async createAccountContactRelationship(
    input: TpCompanyProfileSignUpMutationInputDto,
    companyEntity: TpCompanyProfileEntity,
    currentUser: CurrentUserInfo
  ) {
    const accountContactRecordProps = new AccountContactRecordProps()
    accountContactRecordProps.AccountId = companyEntity.props.id
    accountContactRecordProps.ContactId = currentUser.userId
    accountContactRecordProps.Roles = 'TALENT_POOL_COMPANY_REPRESENTATIVE'
    accountContactRecordProps.ReDI_Company_Representative_Status__c =
      input.operationType ===
      TpCompanyProfileSignUpOperationType.EXISTING_COMPANY
        ? TpCompanyRepresentativeRelationshipStatus.PENDING
        : TpCompanyRepresentativeRelationshipStatus.APPROVED

    const accountContactRecordCreationResult =
      await this.sfService.createAccountContactRelationship(
        AccountContactRecord.create(accountContactRecordProps)
      )
    console.log(
      '[TpCompanyProfileSignUpUseCase]',
      'created accountcontact record',
      accountContactRecordCreationResult.id
    )
  }
}
