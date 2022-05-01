import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { TpCompanyProfileEntityProps } from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpCompanyProfilesService } from './tp-company-profiles.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpCompanyProfileEntityProps)
export class TpCompanyProfilesResolver {
  constructor(
    private readonly tpCompanyProfilesService: TpCompanyProfilesService
  ) {}

  //! TODO: Add auth
  @Query(() => [TpCompanyProfileEntityProps], { name: 'tpCompanyProfiles' })
  async findAll() {
    const entities = await this.tpCompanyProfilesService.findAll({})
    const props = entities.map((entity) => entity.props)
    return props
  }

  //! TODO: Add auth
  // @Query(() => ConProfileEntityProps, {
  //   name: 'conProfile',
  // })
  // async findOne(@Args() args: FindOneConProfileArgs) {
  //   if (args.id && args.loopbackUserId) {
  //     throw new BadRequestException(
  //       'You cannot pass both id and loopbackUserId'
  //     )
  //   }
  //   if (args.loopbackUserId) {
  //     const entity = await this.conProfilesService.findOneByLoopbackUserId(
  //       args.loopbackUserId
  //     )
  //     return entity.props
  //   }
  //   if (args.id) {
  //     const entity = await this.conProfilesService.findOneById(args.id)
  //     return entity.props
  //   }
  //   throw new BadRequestException('Must provide either loopbackUserId or id')
  // }

  // @Query(() => ConProfileEntity, { name: 'conProfile' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.conProfilesService.findOne(id)
  // }

  //! TODO: Add auth
  // @Mutation(() => ConProfileEntityProps, { name: 'patchConProfile' })
  // async patch(
  //   @Args('patchConProfileInput') patchConProfileInput: PatchConProfileInput
  // ) {
  //   const updatedEntity = await this.conProfilesService.update(
  //     patchConProfileInput
  //   )
  //   return updatedEntity.props
  // }

  // @Mutation(() => ConProfileEntity)
  // removeConProfile(@Args('id', { type: () => Int }) id: number) {
  //   return this.conProfilesService.remove(id)
  // }

  //! TODO: Add auth
  // @ResolveField((of) => [ConMentoringSessionEntityProps])
  // async mentoringSessions(
  //   @Parent() conProfile: ConProfileEntityProps
  // ): Promise<ConMentoringSessionEntityProps[]> {
  //   const { _contactId } = conProfile
  //   const mentoringSessions = await this.conMentoringSessionsService.findAll({
  //     $or: [{ Mentee__c: _contactId }, { Mentor__c: _contactId }],
  //   })
  //   const props = mentoringSessions.map((entity) => entity.props)

  //   return props
  // }
}
