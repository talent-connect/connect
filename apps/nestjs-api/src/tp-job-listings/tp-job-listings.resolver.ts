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
  TpJobListingEntityProps,
} from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpCompanyProfilesService } from '../tp-company-profiles/tp-company-profiles.service'
import { FindAllVisibleTpJobListingsArgs } from './args/find-all-visible-tp-jobseeker-profiles.args'
import { FindOneTpJobListingArgs } from './args/find-one-tp-job-listing.args'
import { TpJobListingPatchInput } from './dtos/tp-job-listing-patch.entityinput'
import { TpJobListingsService } from './tp-job-listings.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobListingEntityProps)
export class TpJobListingsResolver {
  constructor(
    private readonly service: TpJobListingsService,
    private readonly tpCompanyProfilesService: TpCompanyProfilesService
  ) {}

  // //! TODO: Add auth
  @Query(() => [TpJobListingEntityProps], {
    name: 'tpJobListings',
  })
  async findAllVisible(@Args() args: FindAllVisibleTpJobListingsArgs) {
    const entities = await this.service.findAllVisibleJobListings(args)
    const props = entities.map((entity) => entity.props)
    return props
  }

  @Query(() => TpJobListingEntityProps, {
    name: 'tpJobListing',
  })
  async findOne(@Args() args: FindOneTpJobListingArgs) {
    const entity = await this.service.findOne(args.filter.id)
    return entity.props
  }

  @ResolveField(() => TpCompanyProfileEntityProps)
  async companyProfile(@Parent() tpJobListing: TpJobListingEntityProps) {
    const entity = await this.tpCompanyProfilesService.findOneById(
      tpJobListing.companyProfileId
    )
    return entity.props
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobListingPatch',
  })
  async patch(@Args('tpJobListingPatchInput') input: TpJobListingPatchInput) {
    await this.service.patch(input)
    return { ok: true }
  }
}
