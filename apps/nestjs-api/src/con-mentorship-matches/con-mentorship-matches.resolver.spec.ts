import { Test, TestingModule } from '@nestjs/testing'
import { ConMentoringSessionsResolver } from './con-mentorship-matches.resolver'
import { ConMentoringSessionsService } from './con-mentorship-matches.service'

describe('ConMentoringSessionsResolver', () => {
  let resolver: ConMentoringSessionsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConMentoringSessionsResolver, ConMentoringSessionsService],
    }).compile()

    resolver = module.get<ConMentoringSessionsResolver>(
      ConMentoringSessionsResolver
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
