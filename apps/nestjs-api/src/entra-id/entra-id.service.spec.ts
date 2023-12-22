import { Test, TestingModule } from '@nestjs/testing';
import { EntraIdService } from './entra-id.service';

describe('EntraIdService', () => {
  let service: EntraIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntraIdService],
    }).compile();

    service = module.get<EntraIdService>(EntraIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
