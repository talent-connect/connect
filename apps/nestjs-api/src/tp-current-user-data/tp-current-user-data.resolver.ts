import { NotFoundException, UseGuards } from '@nestjs/common'
import { Query, ResolveField, Resolver } from '@nestjs/graphql'
import {
  TpCompanyRepresentativeRelationshipEntityProps,
  TpJobseekerProfileEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpCompanyRepresentativeRelationshipsService } from '../tp-company-profiles/tp-company-representative-relationships.service'
import { TpJobseekerProfilesService } from '../tp-jobseeker-profiles/tp-jobseeker-profiles.service'
import { TpCurrentUserData } from './dto/find-current-user-data.dto'
@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpCurrentUserData)
export class TpCurrentUserDataResolver {
  constructor(
    private readonly tpCompanyRepresentativeRelationshipsService: TpCompanyRepresentativeRelationshipsService,
    private readonly jobseekerProfilesService: TpJobseekerProfilesService
  ) {}

  @Query(() => TpCurrentUserData, { name: 'tpCurrentUserDataGet' })
  async getCurrentUserData() {
    return new TpCurrentUserData()
  }

  @ResolveField(() => TpCompanyRepresentativeRelationshipEntityProps)
  async representedCompany(@CurrentUser() currentUser: CurrentUserInfo) {
    try {
      const entity =
        await this.tpCompanyRepresentativeRelationshipsService.findCompanyRepresentedByUser(
          currentUser.userId
        )
      return entity.props
    } catch (err) {
      if (err instanceof NotFoundException) return null
      else throw err
    }
  }

  @ResolveField((of) => TpCompanyRepresentativeRelationshipEntityProps)
  async companyRepresentativeRelationship(
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    try {
      const entity =
        await this.tpCompanyRepresentativeRelationshipsService.findCompanyRepresentativeRelationshipByUser(
          currentUser.userId
        )
      return entity.props
    } catch (err) {
      if (err instanceof NotFoundException) return null
      else throw err
    }
  }

  @ResolveField((of) => TpJobseekerProfileEntityProps)
  async jobseekerProfile(@CurrentUser() currentUser: CurrentUserInfo) {
    try {
      const entity = await this.jobseekerProfilesService.findOneByUserId(
        currentUser.userId
      )
      return entity.props
    } catch (err) {
      if (err instanceof NotFoundException) return null
      else throw err
    }
  }
}
