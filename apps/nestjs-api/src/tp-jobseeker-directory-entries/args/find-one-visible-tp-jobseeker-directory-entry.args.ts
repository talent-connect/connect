import { ArgsType, Field, ID, InputType } from '@nestjs/graphql'

@ArgsType()
export class FindOneVisibleTpJobseekerDirectoryEntryArgs {
  filter: FindOneVisibleTpJobseekerDirectoryEntry
}

@InputType('FindOneVisibleTpJobseekerDirectoryEntry')
class FindOneVisibleTpJobseekerDirectoryEntry {
  @Field((type) => ID)
  tpJobseekerProfileId: string
}
