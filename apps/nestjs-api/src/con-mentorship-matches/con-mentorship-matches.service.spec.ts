import { Test, TestingModule } from '@nestjs/testing'
import { ConMentoringSessionsService } from './con-mentorship-matches.service'

describe('ConMentoringSessionsService', () => {
  let service: ConMentoringSessionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConMentoringSessionsService],
    }).compile()

    service = module.get<ConMentoringSessionsService>(
      ConMentoringSessionsService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
