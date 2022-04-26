import { Test, TestingModule } from '@nestjs/testing'
import { ConMentorshipMatchesResolver } from './con-mentorship-matches.resolver'
import { ConMentorshipMatchesService } from './con-mentorship-matches.service'

describe('ConMentorshipMatchesResolver', () => {
  let resolver: ConMentorshipMatchesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConMentorshipMatchesResolver, ConMentorshipMatchesService],
    }).compile()

    resolver = module.get<ConMentorshipMatchesResolver>(
      ConMentorshipMatchesResolver
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
