import { Field, ObjectType } from '@nestjs/graphql'
import {
  TpCompanyProfileEntityProps,
  TpCompanyRepresentativeRelationshipEntityProps,
  TpJobListingEntityProps,
  TpJobseekerDirectoryEntryEntityProps,
  UserContactEntityProps,
} from '@talent-connect/common-types'

@ObjectType('TpCurrentUserData')
export class TpCurrentUserData {
  @Field((type) => TpCompanyProfileEntityProps)
  representedCompany?: TpCompanyProfileEntityProps

  @Field((type) => TpCompanyRepresentativeRelationshipEntityProps)
  companyRepresentativeRelationship?: TpCompanyRepresentativeRelationshipEntityProps

  @Field((type) => TpJobseekerDirectoryEntryEntityProps)
  tpJobseekerDirectoryEntry?: TpJobseekerDirectoryEntryEntityProps

  @Field((type) => [TpJobListingEntityProps])
  jobListings?: Array<TpJobListingEntityProps>

  @Field((type) => UserContactEntityProps)
  userContact: UserContactEntityProps
}
