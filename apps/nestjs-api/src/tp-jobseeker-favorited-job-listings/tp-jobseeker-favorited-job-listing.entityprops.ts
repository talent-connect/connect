import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '@talent-connect/common-types'

@ObjectType('TpJobseekerFavoritedJobListing')
export class TpJobseekerFavoritedJobListingEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string

  @Field((type) => ID)
  tpJobseekerProfileId: string
  @Field((type) => ID)
  tpJobListingId: string

  createdAt: Date
  updatedAt: Date
}
