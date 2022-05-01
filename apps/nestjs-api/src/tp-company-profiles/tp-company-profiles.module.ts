import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { TpCompanyProfileMapper } from './mappers/tp-company-profile.mapper'
import { TpCompanyProfilesResolver } from './tp-company-profiles.resolver'
import { TpCompanyProfilesService } from './tp-company-profiles.service'

@Module({
  imports: [AuthModule, SalesforceApiModule],
  providers: [
    TpCompanyProfilesResolver,
    TpCompanyProfilesService,
    TpCompanyProfileMapper,
  ],
  exports: [],
})
export class TpCompanyProfilesModule {}
