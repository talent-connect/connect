import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  TpCompanyProfileEntityProps,
  UserContactEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindOneTpCompanyProfileArgs } from './args/find-one-tp-company-profile.args'
import { TpCompanyProfilePatchInput } from './dtos/tp-company-profile-patch.entityinput'
import { TpCompanyProfilesService } from './tp-company-profiles.service'
import { TpCompanyRepresentativeRelationshipsService } from './tp-company-representative-relationships.service'
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
    private readonly tpCompanyProfilesService: TpCompanyProfilesService,
    private readonly tpCompanyRepresentativeRelationshipsService: TpCompanyRepresentativeRelationshipsService
  ) {}

  @Query(() => [TpCompanyProfileEntityProps], {
    name: 'tpCompanyProfiles',
  })
  async findAll() {
    const entities = await this.tpCompanyProfilesService.findAll({})
    const props = entities.map((entity) => entity.props)
    return props
  }

  @Query(() => TpCompanyProfileEntityProps, {
    name: 'tpCompanyProfile',
  })
  async findOne(@Args() args: FindOneTpCompanyProfileArgs) {
    const entity = await this.tpCompanyProfilesService.findOneById(args.id)
    return entity.props
  }

  @ResolveField((of) => [UserContactEntityProps])
  async companyRepresentatives(
    @Parent() tpCompanyProfile: TpCompanyProfileEntityProps
  ) {
    const entities =
      await this.tpCompanyRepresentativeRelationshipsService.findCompanyRepresentativesByCompany(
        tpCompanyProfile.id
      )
    const props = entities.map((entity) => entity.props)

    return props
  }

  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpCompanyProfilePatch',
  })
  async patch(
    @Args('tpCompanyProfilePatchInput') input: TpCompanyProfilePatchInput,
    @CurrentUser() user: CurrentUserInfo
  ) {
    await this.tpCompanyProfilesService.patch(input, user)
    return { ok: true }
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
