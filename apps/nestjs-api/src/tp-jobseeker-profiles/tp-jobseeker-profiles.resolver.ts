import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { TpJobseekerProfilesService } from './tp-jobseeker-profiles.service';

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerProfileEntityProps)
export class TpJobseekerProfilesResolver {
  constructor(
    private readonly service: TpJobseekerProfilesService
  ) {}
}

  //! TODO: Add auth
  @Query(() => [TpJobseekerEntityProps], {
    name: 'tpJobseekerProfiles',
  })
  async findAllVisible() {
    const entities = await this.service.findAll({})
    const props = entities.map((entity) => entity.props)
    return props
  }
}
