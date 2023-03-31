import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class FindAllTpJobseekerCvExperienceRecordsArgs {
  @Field((of) => ID)
  tpJobseekerCvId?: string
}
