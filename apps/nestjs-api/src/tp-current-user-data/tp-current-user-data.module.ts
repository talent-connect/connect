import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { TpCompanyProfilesModule } from '../tp-company-profiles/tp-company-profiles.module'
import { TpJobseekerProfilesModule } from '../tp-jobseeker-profiles/tp-jobseeker-profiles.module'
import { TpCurrentUserDataResolver } from './tp-current-user-data.resolver'

@Module({
  imports: [AuthModule, TpCompanyProfilesModule, TpJobseekerProfilesModule],
  providers: [TpCurrentUserDataResolver],
})
export class TpCurrentUserDataModule {}
