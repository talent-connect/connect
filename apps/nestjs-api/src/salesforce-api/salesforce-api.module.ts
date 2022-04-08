import { Module } from '@nestjs/common'
import { SalesforceApiService } from './salesforce-api.service'

@Module({
  providers: [SalesforceApiService],
})
export class SalesforceApiModule {}
