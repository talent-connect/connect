import { UseGuards } from '@nestjs/common'
import { Query, ResolveField, Resolver } from '@nestjs/graphql'
import { TpCompanyRepresentativeRelationshipEntityProps } from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpCompanyRepresentativeRelationshipsService } from '../tp-company-profiles/tp-company-representative-relationships.service'
import { TpCurrentUserData } from './dto/find-current-user-data.dto'
@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpCurrentUserData)
export class TpCurrentUserDataResolver {
  constructor(
    private readonly tpCompanyRepresentativeRelationshipsService: TpCompanyRepresentativeRelationshipsService
  ) {}

  @Query(() => TpCurrentUserData, { name: 'tpCurrentUserDataGet' })
  async getCurrentUserData() {
    return new TpCurrentUserData()
  }

  @ResolveField(() => TpCompanyRepresentativeRelationshipEntityProps)
  async representedCompany(@CurrentUser() currentUser: CurrentUserInfo) {
    const entity =
      await this.tpCompanyRepresentativeRelationshipsService.findCompanyRepresentedByUser(
        currentUser.userId
      )

    return entity.props
  }

  @ResolveField((of) => TpCompanyRepresentativeRelationshipEntityProps)
  async companyRepresentationStatus(
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const entity =
      await this.tpCompanyRepresentativeRelationshipsService.findCompanyRepresentativeRelationshipByUser(
        currentUser.userId
      )

    return entity.props
  }
}
