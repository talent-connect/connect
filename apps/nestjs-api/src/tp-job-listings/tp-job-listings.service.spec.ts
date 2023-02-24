import { Test, TestingModule } from '@nestjs/testing'
import { TpJobseekerProfilesService } from './tp-jobseeker-profiles.service'

describe('TpJobseekerProfilesService', () => {
  let service: TpJobseekerProfilesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TpJobseekerProfilesService],
    }).compile()

    service = module.get<TpJobseekerProfilesService>(TpJobseekerProfilesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
