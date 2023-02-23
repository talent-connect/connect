import { Field, ObjectType } from '@nestjs/graphql'
import {
  TpCompanyProfileEntityProps,
  TpCompanyRepresentativeRelationshipEntityProps,
  TpJobseekerProfileEntityProps,
} from '@talent-connect/common-types'

@ObjectType('TpCurrentUserData')
export class TpCurrentUserData {
  @Field((type) => TpCompanyProfileEntityProps)
  representedCompany?: TpCompanyProfileEntityProps

  @Field((type) => TpCompanyRepresentativeRelationshipEntityProps)
  companyRepresentativeRelationship?: TpCompanyRepresentativeRelationshipEntityProps

  @Field((type) => TpJobseekerProfileEntityProps)
  jobseekerProfile?: TpJobseekerProfileEntityProps
}
