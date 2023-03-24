import { InputType, ObjectType } from '@nestjs/graphql'

@InputType('TpJobseekerFavoritedJobListingCreateMutationInputDto')
export class TpJobseekerFavoritedJobListingCreateMutationInputDto {
  tpJoblistingId: string
}

@ObjectType('TpJobseekerFavoritedJobListingCreateMutationOutputDto')
export class TpJobseekerFavoritedJobListingCreateMutationOutputDto {
  ok: boolean
}
