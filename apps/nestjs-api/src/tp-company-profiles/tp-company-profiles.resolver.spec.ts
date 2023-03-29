import { Test, TestingModule } from '@nestjs/testing'
import { ConProfilesResolver } from './con-profiles.resolver'
import { ConProfilesService } from './con-profiles.service'

describe('ConProfilesResolver', () => {
  let resolver: ConProfilesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConProfilesResolver, ConProfilesService],
    }).compile()

    resolver = module.get<ConProfilesResolver>(ConProfilesResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
