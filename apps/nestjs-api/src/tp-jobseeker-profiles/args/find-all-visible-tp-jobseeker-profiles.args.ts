import { ArgsType } from '@nestjs/graphql'

@ArgsType()
export class FindAllVisibleTpJobseekerProfilesArgs {
  loadLanguages: boolean
}
