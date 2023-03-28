import { InputType, ObjectType } from '@nestjs/graphql'

@InputType('TpCompanyFavoritedJobseekerProfileDeleteMutationInputDto')
export class TpCompanyFavoritedJobseekerProfileDeleteMutationInputDto {
  tpJobseekerProfileId: string
}

@ObjectType('TpCompanyFavoritedJobseekerProfileDeleteMutationOutputDto')
export class TpCompanyFavoritedJobseekerProfileDeleteMutationOutputDto {
  ok: boolean
}
