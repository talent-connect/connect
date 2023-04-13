import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class FindAllTpJobseekerCvEducationRecordsArgs {
  @Field((of) => ID)
  tpJobseekerCvId?: string
}
