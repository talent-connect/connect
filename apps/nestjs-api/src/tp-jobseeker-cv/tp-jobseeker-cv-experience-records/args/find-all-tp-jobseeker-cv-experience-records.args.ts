import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class FindAllTpJobseekerCvLanguageRecordsArgs {
  @Field((of) => ID)
  tpJobseekerCvId?: string
}
