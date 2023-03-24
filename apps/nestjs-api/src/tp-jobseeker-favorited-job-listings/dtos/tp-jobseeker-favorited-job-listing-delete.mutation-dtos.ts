import { InputType, ObjectType } from '@nestjs/graphql'

@InputType('TpJobseekerFavoritedJobListingDeleteMutationInputDto')
export class TpJobseekerFavoritedJobListingDeleteMutationInputDto {
  tpJobListingId: string
}

@ObjectType('TpJobseekerFavoritedJobListingDeleteMutationOutputDto')
export class TpJobseekerFavoritedJobListingDeleteMutationOutputDto {
  ok: boolean
}
