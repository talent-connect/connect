import { InputType, Int, Field } from '@nestjs/graphql'

@InputType('ConProfileSignUpMentorInput')
export class ConProfileSignUpMentorInput {
  email: string
  firstName: string
  lastName: string
}
