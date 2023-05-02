import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Language, LanguageProficiencyLevel } from '../../../common-objects'

@ObjectType('TpJobseekerCvLanguageRecord')
export class TpJobseekerCvLanguageRecordEntityProps {
  @Field((type) => ID)
  id: string
  @Field((type) => ID)
  tpJobseekerCvId: string

  @Field((type) => Language)
  language: Language

  @Field((type) => LanguageProficiencyLevel)
  proficiencyLevelId: LanguageProficiencyLevel

  userId: string
}
