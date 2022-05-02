import { InputType, Int, Field, ObjectType } from '@nestjs/graphql'
import { FirstPointOfTpContactOption } from '../enums'

@InputType('TpCompanyProfileSignUpRepresentativeNewCompanyInput')
export class TpCompanyProfileSignUpRepresentativeNewCompanyInput {
  email: string
  firstName: string
  lastName: string
  @Field((type) => FirstPointOfTpContactOption)
  firstPointOfContact: FirstPointOfTpContactOption
  firstPointOfContactOther?: string
}

@ObjectType('TpCompanyProfileSignUpRepresentativeNewCompanyOutput')
export class TpCompanyProfileSignUpRepresentativeNewCompanyOutput {
  email: string
  firstName: string
  lastName: string
  companyName: string
}
