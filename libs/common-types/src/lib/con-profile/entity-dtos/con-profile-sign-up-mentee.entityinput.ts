import { InputType, Int, Field } from '@nestjs/graphql'
import { RediCourse } from '../enums'

@InputType('ConProfileSignUpMenteeInput')
export class ConProfileSignUpMenteeInput {
  email: string
  firstName: string
  lastName: string
}
