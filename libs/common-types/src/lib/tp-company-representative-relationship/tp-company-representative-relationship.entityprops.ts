import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import { CompanyTalentPoolState } from '../tp-company-profile/enums'
import { TpCompanyRepresentativeRelationshipStatus } from './enums'

@ObjectType('TpCompanyProfile')
export class TpCompanyRepresentativeRelationshipEntityProps
  implements EntityProps
{
  @Field((type) => ID)
  id: string

  @Field((type) => CompanyTalentPoolState)
  status: TpCompanyRepresentativeRelationshipStatus

  createdAt: Date
  updatedAt: Date
}
