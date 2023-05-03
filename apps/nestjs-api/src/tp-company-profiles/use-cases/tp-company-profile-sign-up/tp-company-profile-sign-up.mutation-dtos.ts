import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { FirstPointOfTpContactOption } from '@talent-connect/common-types'
import { TpCompanyProfileSignUpOperationType } from './tp-company-profile-sign-up-operation-type.enum'

@InputType('TpCompanyProfileSignUpInputDto')
export class TpCompanyProfileSignUpMutationInputDto {
  firstName: string
  lastName: string

  @Field((type) => TpCompanyProfileSignUpOperationType)
  operationType: TpCompanyProfileSignUpOperationType
  // company id if operationType = EXISTING_COMPANY,
  // company name if operationType = NEW_COMPANY
  companyIdOrName: string
  @Field((type) => FirstPointOfTpContactOption)
  firstPointOfContact: FirstPointOfTpContactOption
  firstPointOfContactOther?: string

  isMicrosoftPartner: boolean
}

@ObjectType('TpCompanyProfileSignUpInputOutputDto')
export class TpCompanyProfileSignUpMutationOutputDto {
  ok: boolean
}
