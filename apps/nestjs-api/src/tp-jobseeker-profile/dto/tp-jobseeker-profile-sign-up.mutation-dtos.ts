import { Field, InputType } from '@nestjs/graphql'
import { RediLocation } from '@talent-connect/common-types'

@InputType('TpJobseekerProfileSignUpDto')
export class TpJobseekerProfileSignUpMutationDto {
  firstName: string
  lastName: string

  @Field(() => RediLocation)
  rediLocation: RediLocation

}
