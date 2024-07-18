import { Test, TestingModule } from '@nestjs/testing'
import { ReminderEmailsController } from './reminder-emails.controller'

describe('ReminderEmailsController', () => {
  let controller: ReminderEmailsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReminderEmailsController],
    }).compile()

    controller = module.get<ReminderEmailsController>(ReminderEmailsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
