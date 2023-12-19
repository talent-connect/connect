import { Test, TestingModule } from '@nestjs/testing'
import { AuthBlablaController } from './auth-blabla.controller'

describe('AuthBlablaController', () => {
  let controller: AuthBlablaController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthBlablaController],
    }).compile()

    controller = module.get<AuthBlablaController>(AuthBlablaController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
