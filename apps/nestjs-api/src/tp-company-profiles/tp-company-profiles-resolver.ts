import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TpCompanyProfileEntityProps } from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindOneTpCompanyProfileArgs } from './args/find-one-tp-company-profile.args'
import { TpCompanyProfilesService } from './tp-company-profiles.service'
import {
  TpCompanyProfileSignUpMutationInputDto,
  TpCompanyProfileSignUpMutationOutputDto,
} from './use-cases/tp-company-profile-sign-up/tp-company-profile-sign-up.mutation-dtos'
import { TpCompanyProfileSignUpUseCase } from './use-cases/tp-company-profile-sign-up/tp-company-profile-sign-up.use-case'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpCompanyProfileEntityProps)
export class TpCompanyProfilesResolver {
  constructor(
    private readonly signUpUseCase: TpCompanyProfileSignUpUseCase,
    private readonly tpCompanyProfilesService: TpCompanyProfilesService
  ) {}

  //! TODO: Add auth
  @Query(() => TpCompanyProfileEntityProps, {
    name: 'tpCompanyProfile',
  })
  async findOne(@Args() args: FindOneTpCompanyProfileArgs) {
    const entity = await this.tpCompanyProfilesService.findOneById(args.id)
    return entity.props
  }

  @Mutation((of) => TpCompanyProfileSignUpMutationOutputDto, {
    name: 'tpCompanyProfileSignUp',
  })
  async companySignUp(
    @Args('input') input: TpCompanyProfileSignUpMutationInputDto,
    @CurrentUser() user: CurrentUserInfo
  ) {
    return await this.signUpUseCase.execute(input, user)
  }
}
