import { InputType, Int, Field } from '@nestjs/graphql'

@InputType('CreateConProblemReportInput')
export class CreateConProblemReportInput {
  problemDescription: string
  ifFromMentor_cancelMentorshipImmediately?: boolean
  reporteeId: string
}
