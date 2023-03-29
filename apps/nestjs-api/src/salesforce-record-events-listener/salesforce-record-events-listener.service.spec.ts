import { Test, TestingModule } from '@nestjs/testing'
import { SalesforceRecordEventsListenerService } from './salesforce-record-events-listener.service'

describe('SalesforceRecordEventsListenerService', () => {
  let service: SalesforceRecordEventsListenerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesforceRecordEventsListenerService],
    }).compile()

    service = module.get<SalesforceRecordEventsListenerService>(
      SalesforceRecordEventsListenerService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
