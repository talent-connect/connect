import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpCompanyProfilesModule } from '../tp-company-profiles/tp-company-profiles.module'
import { TpCompanyFavoritedJobseekerProfileMapper } from './mappers/tp-company-favorited-jobseeker-profile.mapper'
import { TpCompanyFavoritedJobseekerProfilesResolver } from './tp-company-favorited-jobseeker-profiles.resolver'
import { TpCompanyFavoritedJobseekerProfilesService } from './tp-company-favorited-jobseeker-profiles.service'

@Module({
  imports: [SfApiModule, AuthModule, TpCompanyProfilesModule],
  providers: [
    TpCompanyFavoritedJobseekerProfilesResolver,
    TpCompanyFavoritedJobseekerProfilesService,
    TpCompanyFavoritedJobseekerProfileMapper,
  ],
  exports: [],
})
export class TpCompanyFavoritedJobseekerProfilesModule {}
