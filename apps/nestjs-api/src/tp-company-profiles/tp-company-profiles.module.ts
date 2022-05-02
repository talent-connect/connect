import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpCompanyProfileMapper } from './mappers/tp-company-profile.mapper'
import { TpCompanyProfilesResolverPublicData } from './tp-company-profiles-public-data.resolver'
import { TpCompanyProfilesService } from './tp-company-profiles.service'
import { TpCompanyProfileSignUpUseCase } from './use-cases/tp-company-profile-sign-up.use-case'

@Module({
  imports: [AuthModule, SfApiModule],
  providers: [
    TpCompanyProfilesResolverPublicData,
    TpCompanyProfilesService,
    TpCompanyProfileMapper,
    TpCompanyProfileSignUpUseCase,
  ],
  exports: [],
})
export class TpCompanyProfilesModule {}
