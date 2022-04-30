import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'

@ObjectType('TpCompanyProfile')
export class TpCompanyProfileEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string
  createdAt: Date
  updatedAt: Date
}
