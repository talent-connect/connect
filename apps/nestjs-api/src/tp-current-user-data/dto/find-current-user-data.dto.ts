import { Field, ObjectType } from '@nestjs/graphql'
import {
  TpCompanyProfileEntityProps,
  TpCompanyRepresentativeRelationshipEntityProps,
  TpJobListingEntityProps,
  TpJobseekerProfileEntityProps,
  UserContactEntityProps,
} from '@talent-connect/common-types'

@ObjectType('TpCurrentUserData')
export class TpCurrentUserData {
  @Field((type) => TpCompanyProfileEntityProps)
  representedCompany?: TpCompanyProfileEntityProps

  @Field((type) => TpCompanyRepresentativeRelationshipEntityProps)
  companyRepresentativeRelationship?: TpCompanyRepresentativeRelationshipEntityProps

  @Field((type) => TpJobseekerProfileEntityProps)
  jobseekerProfile?: TpJobseekerProfileEntityProps

  @Field((type) => [TpJobListingEntityProps])
  jobListings?: Array<TpJobListingEntityProps>

  @Field((type) => UserContactEntityProps)
  userContact: UserContactEntityProps
}
