import { InputType, ObjectType } from '@nestjs/graphql'

@InputType('TpCompanyFavoritedJobseekerProfileCreateMutationInputDto')
export class TpCompanyFavoritedJobseekerProfileCreateMutationInputDto {
  tpJobseekerProfileId: string
}

@ObjectType('TpCompanyFavoritedJobseekerProfileCreateMutationOutputDto')
export class TpCompanyFavoritedJobseekerProfileCreateMutationOutputDto {
  ok: boolean
}
