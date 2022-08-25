import { Test, TestingModule } from '@nestjs/testing'
import { TpJobseekerProfilesResolver } from './tp-jobseeker-profiles.resolver'

describe('TpJobseekerProfilesResolver', () => {
  let resolver: TpJobseekerProfilesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TpJobseekerProfilesResolver],
    }).compile()

    resolver = module.get<TpJobseekerProfilesResolver>(
      TpJobseekerProfilesResolver
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
