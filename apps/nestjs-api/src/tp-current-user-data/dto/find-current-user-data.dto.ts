import { Field, ObjectType } from '@nestjs/graphql'
import {
  TpCompanyProfileEntityProps,
  TpCompanyRepresentativeRelationshipEntityProps,
} from '@talent-connect/common-types'

@ObjectType('TpCurrentUserData')
export class TpCurrentUserData {
  @Field((type) => TpCompanyProfileEntityProps)
  representedCompany: TpCompanyProfileEntityProps

  @Field((type) => TpCompanyRepresentativeRelationshipEntityProps)
  companyRepresentativeStatus: TpCompanyRepresentativeRelationshipEntityProps
}
