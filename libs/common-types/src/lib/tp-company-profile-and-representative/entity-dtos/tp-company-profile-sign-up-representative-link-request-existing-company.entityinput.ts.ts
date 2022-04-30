import { InputType, ObjectType } from '@nestjs/graphql'

@InputType(
  'TpCompanyProfileSignUpRepresentativeLinkRequestExistingCompanyInput'
)
export class TpCompanyProfileSignUpRepresentativeLinkRequestExistingCompanyInput {
  email: string
  firstName: string
  lastName: string
}

@ObjectType(
  'TpCompanyProfileSignUpRepresentativeLinkRequestExistingCompanyOutput'
)
export class TpCompanyProfileSignUpRepresentativeLinkRequestExistingCompanyOutput {
  email: string
  firstName: string
  lastName: string
}
