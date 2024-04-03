import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApicallsService } from './apicalls.service';
import { ApiCalls } from '../entities/apicalls.entity';
import { Repository } from 'typeorm';
import { Webshop } from '../../webshop/entities/webshop.entity';
import { InternalServerErrorException } from '@nestjs/common';

// Mock factory for the repository
const mockRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ApicallsService', () => {
  let service: ApicallsService;
  let repository: MockRepository<ApiCalls>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApicallsService,
        {
          provide: getRepositoryToken(ApiCalls),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ApicallsService>(ApicallsService);
    repository = module.get<MockRepository<ApiCalls>>(getRepositoryToken(ApiCalls));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrUpdate', () => {
    it('should successfully create a new API call record', async () => {
      repository.findOne.mockResolvedValue(undefined);
      const webshop = new Webshop(); // Simulate webshop entity
      const url = 'http://example.com';

      // Assume create sets up the object but save actually "saves" it, so we mock save to return a value
      repository.save.mockResolvedValue(new ApiCalls());

      await service.createOrUpdate(webshop, url);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { webshop, url } });
      expect(repository.save).toHaveBeenCalled();
    });

    it('should successfully update an existing API call record', async () => {
      const existingApiCall = new ApiCalls();
      existingApiCall.counter = 1;

      repository.findOne.mockResolvedValue(existingApiCall);
      const webshop = new Webshop(); // Simulate webshop entity
      const url = 'http://example.com';

      await service.createOrUpdate(webshop, url);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { webshop, url } });
      expect(existingApiCall.counter).toBe(2);
      expect(repository.save).toHaveBeenCalledWith(existingApiCall);
    });

    it('should throw InternalServerErrorException when repository operation fails', async () => {
      repository.findOne.mockRejectedValue(new Error('Simulated database error')); // Simulate a failure
      const webshop = new Webshop(); // Simulate webshop entity
      const url = 'http://example.com';

      // Expect service to throw an InternalServerErrorException when repository operations fail
      await expect(service.createOrUpdate(webshop, url)).rejects.toThrow(InternalServerErrorException);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { webshop, url } });
      // Verify that no further actions are taken after the error
      expect(repository.save).not.toHaveBeenCalled();
    });
  });
});
