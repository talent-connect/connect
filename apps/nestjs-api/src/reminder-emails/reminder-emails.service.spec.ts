import { Test, TestingModule } from '@nestjs/testing'
import { ReminderEmailsService } from './reminder-emails.service'

describe('ReminderEmailsService', () => {
  let service: ReminderEmailsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReminderEmailsService],
    }).compile()

    service = module.get<ReminderEmailsService>(ReminderEmailsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
