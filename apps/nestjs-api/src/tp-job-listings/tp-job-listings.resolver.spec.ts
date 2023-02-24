import { Test, TestingModule } from '@nestjs/testing'

describe('TpJobListingsResolver', () => {
  let resolver: TpJobListingsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TpJobListingsResolver],
    }).compile()

    resolver = module.get<TpJobListingsResolver>(TpJobListingsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
