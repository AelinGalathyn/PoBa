import { Test, TestingModule } from '@nestjs/testing';
import { ApicallsService } from './apicalls.service';

describe('ApicallsService', () => {
  let service: ApicallsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApicallsService],
    }).compile();

    service = module.get<ApicallsService>(ApicallsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
