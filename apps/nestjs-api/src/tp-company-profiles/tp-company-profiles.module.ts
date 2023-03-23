import { Module } from '@nestjs/common'
import {
  TpCompanyProfileMapper,
  TpCompanyRepresentativeRelationshipMapper,
  UserContactMapper,
} from '@talent-connect/common-types'
import { AuthModule } from '../auth/auth.module'
import { EmailModule } from '../email/email.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpCompanyProfilesResolverPublicData } from './tp-company-profiles-public-data.resolver'
import { TpCompanyProfilesResolver } from './tp-company-profiles-resolver'
import { TpCompanyProfilesSalesforceEventHandlerService } from './tp-company-profiles-salesforce-event-handler.service'
import { TpCompanyProfilesService } from './tp-company-profiles.service'
import { TpCompanyRepresentativeRelationshipsService } from './tp-company-representative-relationships.service'
import { TpCompanyProfileSignUpUseCase } from './use-cases/tp-company-profile-sign-up/tp-company-profile-sign-up.use-case'

@Module({
  imports: [AuthModule, EmailModule, SfApiModule],
  providers: [
    TpCompanyProfileMapper,
    TpCompanyRepresentativeRelationshipMapper,
    TpCompanyProfilesResolverPublicData,
    TpCompanyProfilesResolver,
    TpCompanyProfilesService,
    TpCompanyRepresentativeRelationshipsService,
    TpCompanyProfileSignUpUseCase,
    UserContactMapper,
    TpCompanyProfilesSalesforceEventHandlerService,
  ],
  exports: [
    TpCompanyRepresentativeRelationshipsService,
    TpCompanyProfilesService,
  ],
})
export class TpCompanyProfilesModule {}
