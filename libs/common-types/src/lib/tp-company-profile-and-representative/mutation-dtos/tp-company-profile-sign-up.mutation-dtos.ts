import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { FirstPointOfTpContactOption } from '../../common-objects'
import { TpCompanyProfileSignUpOperationType } from '../enums/tp-company-profile-sign-up-operation-type.enum'

@InputType('TpCompanyProfileSignUpInputDto')
export class TpCompanyProfileSignUpMutationInputDto {
  email: string
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
}

@ObjectType('TpCompanyProfileSignUpInputOutputDto')
export class TpCompanyProfileSignUpMutationOutputDto {
  ok: boolean
}
