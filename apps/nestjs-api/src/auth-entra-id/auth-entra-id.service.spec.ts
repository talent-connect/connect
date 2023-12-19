import { Test, TestingModule } from '@nestjs/testing'
import { AuthEntraIdService } from './auth-entra-id.service'

describe('AuthEntraIdService', () => {
  let service: AuthEntraIdService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthEntraIdService],
    }).compile()

    service = module.get<AuthEntraIdService>(AuthEntraIdService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
