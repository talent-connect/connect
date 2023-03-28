import { Test, TestingModule } from '@nestjs/testing'
import { TpCurrentUserDataResolver } from './tp-current-user-data.resolver'

describe('TpCurrentUserDataResolver', () => {
  let resolver: TpCurrentUserDataResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TpCurrentUserDataResolver],
    }).compile()

    resolver = module.get<TpCurrentUserDataResolver>(TpCurrentUserDataResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
