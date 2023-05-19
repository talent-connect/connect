import { Test, TestingModule } from '@nestjs/testing'
// import { TpJobListingsService } from './tp-jobseeker-profiles.service'
import { TpJobListingsService } from './tp-job-listings.service'

describe('TpJobListingsService', () => {
  let service: TpJobListingsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TpJobListingsService],
    }).compile()

    service = module.get<TpJobListingsService>(TpJobListingsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
