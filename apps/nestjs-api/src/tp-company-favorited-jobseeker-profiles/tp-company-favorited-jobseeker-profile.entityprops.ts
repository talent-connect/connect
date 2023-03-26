import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '@talent-connect/common-types'

@ObjectType('TpCompanyFavoritedJobseekerProfile')
export class TpCompanyFavoritedJobseekerProfileEntityProps
  implements EntityProps
{
  @Field((type) => ID)
  id: string

  @Field((type) => ID)
  tpCompanyProfileId: string
  @Field((type) => ID)
  favoritedTpJobseekerProfileId: string

  createdAt: Date
  updatedAt: Date
}
