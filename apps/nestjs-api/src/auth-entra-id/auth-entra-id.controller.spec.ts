import { Test, TestingModule } from '@nestjs/testing';
import { AuthEntraIdController } from './auth-entra-id.controller';

describe('AuthEntraIdController', () => {
  let controller: AuthEntraIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthEntraIdController],
    }).compile();

    controller = module.get<AuthEntraIdController>(AuthEntraIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
