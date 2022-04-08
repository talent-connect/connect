import { Test, TestingModule } from '@nestjs/testing'
import { SalesforceApiService } from './salesforce-api.service'

describe('SalesforceApiService', () => {
  let service: SalesforceApiService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesforceApiService],
    }).compile()

    service = module.get<SalesforceApiService>(SalesforceApiService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
