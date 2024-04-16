import { Test, TestingModule } from '@nestjs/testing';
import { WebshopController } from './webshop.controller';

describe('WebshopController', () => {
  let controller: WebshopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebshopController],
    }).compile();

    controller = module.get<WebshopController>(WebshopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
