import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import { TpCompanyRepresentativeRelationshipStatus } from './enums'

@ObjectType('TpCompanyRepresentativeRelationship')
export class TpCompanyRepresentativeRelationshipEntityProps
  implements EntityProps
{
  @Field((type) => ID)
  id: string

  tpCompanyProfileId: string
  userId: string

  @Field((type) => TpCompanyRepresentativeRelationshipStatus)
  status: TpCompanyRepresentativeRelationshipStatus

  createdAt: Date
  updatedAt: Date
}
