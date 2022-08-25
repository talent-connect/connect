import { InputType } from '@nestjs/graphql'

@InputType('CreateConProblemReportInput')
export class CreateConProblemReportInput {
  problemDescription: string
  ifFromMentor_cancelMentorshipImmediately?: boolean
  reporteeProfileId: string
}
