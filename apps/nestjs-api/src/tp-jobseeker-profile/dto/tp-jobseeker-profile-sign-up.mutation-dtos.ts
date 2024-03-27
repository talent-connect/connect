import { Field, InputType } from '@nestjs/graphql'
import { RediLocation } from '@talent-connect/common-types'

@InputType('TpJobseekerProfileSignUpDto')
export class TpJobseekerProfileSignUpMutationDto {
  @Field(() => RediLocation)
  rediLocation: RediLocation
}
