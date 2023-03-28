import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { TpCompanyProfilesModule } from '../tp-company-profiles/tp-company-profiles.module'
import { TpJobListingsModule } from '../tp-job-listings/tp-job-listings.module'
import { TpJobseekerDirectoryEntriesModule } from '../tp-jobseeker-directory-entries/tp-jobseeker-directory-entries.module'
import { TpCurrentUserDataResolver } from './tp-current-user-data.resolver'

@Module({
  imports: [
    AuthModule,
    TpCompanyProfilesModule,
    TpJobseekerDirectoryEntriesModule,
    TpJobListingsModule,
  ],
  providers: [TpCurrentUserDataResolver],
})
export class TpCurrentUserDataModule {}
