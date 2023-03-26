import { Field, InputType } from '@nestjs/graphql'
import { RediCourse, RediLocation } from '@talent-connect/common-types'

@InputType('TpJobseekerProfileSignUpDto')
export class TpJobseekerProfileSignUpMutationDto {
  firstName: string
  lastName: string

  @Field(() => RediLocation)
  rediLocation: RediLocation

  @Field(() => RediCourse)
  currentlyEnrolledInCourse: RediCourse
}
