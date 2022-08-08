import { Field, ObjectType } from '@nestjs/graphql'
import {
  TpCompanyProfileEntityProps,
  TpCompanyRepresentativeRelationshipStatus,
} from '@talent-connect/common-types'

@ObjectType('TpCurrentUserData')
export class TpCurrentUserData {
  @Field((type) => TpCompanyProfileEntityProps)
  representedCompany: TpCompanyProfileEntityProps

  @Field((type) => TpCompanyRepresentativeRelationshipStatus)
  companyRepresentationStatus: TpCompanyRepresentativeRelationshipStatus
}
