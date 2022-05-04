import { Injectable } from '@nestjs/common'
import {
  AccountContactRecord,
  AccountContactRecordProps,
  ContactRecord,
  ContactRecordProps,
  TpCompanyProfileEntity,
} from '@talent-connect/common-types'
import { TpCompanyProfileSignUpOperationType } from 'apps/nestjs-api/src/tp-company-profiles/use-cases/tp-company-profile-sign-up/tp-company-profile-sign-up-operation-type.enum'
import { CurrentUserInfo } from '../../../auth/current-user.interface'
import { SfApiTpCompanyProfilesService } from '../../../salesforce-api/sf-api-tp-company-profiles.service'
import { TpCompanyProfileMapper } from '../../mappers/tp-company-profile.mapper'
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
    private readonly tpCompanyProfilesSerivce: TpCompanyProfilesService
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
    let companyEntity: TpCompanyProfileEntity

    console.log('creating new company or getting existing one')
    if (
      input.operationType ===
      TpCompanyProfileSignUpOperationType.EXISTING_COMPANY
    ) {
      companyEntity = await this.tpCompanyProfilesSerivce.findOneById(
        input.companyIdOrName
      )
    } else {
      const accountRecord = await this.sfService.createAccountWithName(
        input.companyIdOrName
      )
      companyEntity = this.mapper.fromPersistence(accountRecord)
    }

    const contactRecordProps = new ContactRecordProps()
    contactRecordProps.Id = currentUser.contactId
    contactRecordProps.FirstName = input.firstName
    contactRecordProps.LastName = input.lastName
    contactRecordProps.ReDI_First_Point_of_Contact_Other_TP__c =
      input.firstPointOfContactOther
    contactRecordProps.ReDI_First_Point_of_Contact_Talent_Pool__c =
      input.firstPointOfContact
    contactRecordProps.Loopback_User_ID__c = currentUser.loopbackUserId

    console.log('updating contact record')
    const contactRecord = await this.sfService.updateContact(
      ContactRecord.create(contactRecordProps)
    )

    const accountContactRecordProps = new AccountContactRecordProps()
    accountContactRecordProps.AccountId = companyEntity.props.id
    accountContactRecordProps.ContactId = contactRecord.props.Id
    accountContactRecordProps.Roles = 'TALENT_POOL_COMPANY_REPRESENTATIVE'
    accountContactRecordProps.ReDI_Company_Representative_Status__c = 'PENDING'

    console.log('inserting accountcontact record')
    await this.sfService.createAccountContactRelationship(
      AccountContactRecord.create(accountContactRecordProps)
    )

    return { ok: true }
  }
}
