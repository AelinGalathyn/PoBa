import { Test, TestingModule } from '@nestjs/testing';
import { WebshopService } from './webshop.service';

describe('WebshopService', () => {
  let service: WebshopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebshopService],
    }).compile();

    service = module.get<WebshopService>(WebshopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
