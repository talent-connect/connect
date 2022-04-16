import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SalesforceApiConProfilesService } from './salesforce-api-con-profiles.service'
import { SalesforceApiRepository } from './salesforce-api.repository'

@Module({
  providers: [SalesforceApiConProfilesService, SalesforceApiRepository],
  imports: [ConfigModule],
  exports: [SalesforceApiConProfilesService],
})
export class SalesforceApiModule {}
