import { InputType } from '@nestjs/graphql'

@InputType('ConProfileSignUpMenteeInput')
export class ConProfileSignUpMenteeInput {
  email: string
  firstName: string
  lastName: string
}
