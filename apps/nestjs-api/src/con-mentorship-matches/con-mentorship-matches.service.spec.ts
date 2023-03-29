import { Test, TestingModule } from '@nestjs/testing'
import { ConMentorshipMatchesService } from './con-mentorship-matches.service'

describe('ConMentorshipMatchesService', () => {
  let service: ConMentorshipMatchesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConMentorshipMatchesService],
    }).compile()

    service = module.get<ConMentorshipMatchesService>(
      ConMentorshipMatchesService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
