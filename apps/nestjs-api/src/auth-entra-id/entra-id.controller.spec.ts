import { Test, TestingModule } from '@nestjs/testing';
import { EntraIdController } from './entra-id.controller';

describe('EntraIdController', () => {
  let controller: EntraIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntraIdController],
    }).compile();

    controller = module.get<EntraIdController>(EntraIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
