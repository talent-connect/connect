import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Language, LanguageProficiencyLevel } from '../../common-objects'

@ObjectType('TpJobseekerProfileLanguageRecord')
export class TpJobseekerProfileLanguageRecordEntityProps {
  @Field((type) => ID)
  id: string
  @Field((type) => ID)
  userId: string

  @Field((type) => Language)
  language: Language

  @Field((type) => LanguageProficiencyLevel)
  proficiencyLevelId: LanguageProficiencyLevel
}
