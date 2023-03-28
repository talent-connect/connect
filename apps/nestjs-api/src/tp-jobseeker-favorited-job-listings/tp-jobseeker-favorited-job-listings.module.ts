import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerProfileModule } from '../tp-jobseeker-profile/tp-jobseeker-profile.module'
import { TpJobseekerFavoritedJobListingMapper } from './mappers/tp-jobseeker-favorited-job-listing.mapper'
import { TpJobseekerFavoritedJobListingsResolver } from './tp-jobseeker-favorited-job-listings.resolver'
import { TpJobseekerFavoritedJobListingsService } from './tp-jobseeker-favorited-job-listings.service'

@Module({
  imports: [SfApiModule, AuthModule, TpJobseekerProfileModule],
  providers: [
    TpJobseekerFavoritedJobListingsResolver,
    TpJobseekerFavoritedJobListingsService,
    TpJobseekerFavoritedJobListingMapper,
  ],
  exports: [],
})
export class TpJobseekerFavoritedJobListingsModule {}
