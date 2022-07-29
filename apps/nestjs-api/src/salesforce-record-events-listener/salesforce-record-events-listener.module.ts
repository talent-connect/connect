import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { SalesforceRecordEventsListenerService } from './salesforce-record-events-listener.service'

@Module({
  providers: [SalesforceRecordEventsListenerService],
  imports: [ConfigModule, EventEmitterModule],
})
export class SalesforceRecordEventsListenerModule {}
