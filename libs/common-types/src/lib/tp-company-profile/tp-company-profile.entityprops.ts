import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import { CompanyTalentPoolState } from './enums'

@ObjectType('TpCompanyProfile')
export class TpCompanyProfileEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string

  profileAvatarImageS3Key?: string
  companyName: string
  location?: string
  tagline?: string
  industry?: string
  website?: string
  linkedInUrl?: string
  telephoneNumber?: string
  about?: string
  @Field((type) => CompanyTalentPoolState)
  state: CompanyTalentPoolState
  isProfileVisibleToJobseekers: boolean
  joinsDusseldorf24WinterJobFair?: boolean
  joinsMunich24SummerJobFair?: boolean

  createdAt: Date
  updatedAt: Date
}
