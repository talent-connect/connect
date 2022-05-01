import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { TpCompanyProfileMapper } from './mappers/tp-company-profile.mapper'
import { TpCompanyProfilesResolverPublicData } from './tp-company-profiles-public-data.resolver'
import { TpCompanyProfilesService } from './tp-company-profiles.service'

@Module({
  imports: [AuthModule, SalesforceApiModule],
  providers: [
    TpCompanyProfilesResolverPublicData,
    TpCompanyProfilesService,
    TpCompanyProfileMapper,
  ],
  exports: [],
})
export class TpCompanyProfilesModule {}
