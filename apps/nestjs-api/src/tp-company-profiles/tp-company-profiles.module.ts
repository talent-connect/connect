import { Module } from '@nestjs/common'
import { TpCompanyProfileMapper } from '@talent-connect/common-types'
import { AuthModule } from '../auth/auth.module'
import { EmailModule } from '../email/email.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpCompanyProfilesResolverPublicData } from './tp-company-profiles-public-data.resolver'
import { TpCompanyProfilesResolver } from './tp-company-profiles-resolver'
import { TpCompanyProfilesService } from './tp-company-profiles.service'
import { TpCompanyProfileSignUpUseCase } from './use-cases/tp-company-profile-sign-up/tp-company-profile-sign-up.use-case'

@Module({
  imports: [AuthModule, EmailModule, SfApiModule],
  providers: [
    TpCompanyProfileMapper,
    TpCompanyProfilesResolverPublicData,
    TpCompanyProfilesResolver,
    TpCompanyProfilesService,
    TpCompanyProfileSignUpUseCase,
  ],
  exports: [],
})
export class TpCompanyProfilesModule {}
