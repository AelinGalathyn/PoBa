import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApicallsService } from './apicalls.service';
import { ApiCalls } from '../entities/apicalls.entity';

// Mock repository functions
const repositoryMockFactory: () => MockType<Repository<ApiCalls>> = jest.fn(() => ({
  findOne: jest.fn().mockResolvedValue(undefined),
  create: jest.fn(),
  save: jest.fn(),
}));


type MockType<T> = {
  [P in keyof T]?: jest.Mock<{} | undefined>;
};


describe('ApicallsService', () => {
  let service: ApicallsService;
  let repositoryMock: MockType<Repository<ApiCalls>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApicallsService,
        {
          provide: getRepositoryToken(ApiCalls),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ApicallsService>(ApicallsService);
    repositoryMock = module.get(getRepositoryToken(ApiCalls));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });



});