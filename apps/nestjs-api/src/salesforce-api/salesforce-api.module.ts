import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SalesforceApiService } from './salesforce-api.service'

@Module({
  providers: [SalesforceApiService],
  imports: [ConfigModule],
  exports: [SalesforceApiService],
})
export class SalesforceApiModule {}
