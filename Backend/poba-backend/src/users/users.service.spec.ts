import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

// Create a mock repository
const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  // Add more mocked methods as necessary
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersService,
          useFactory: () => {
            return new UsersService((mockRepository as any))
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    // Clear mocks before each test
    jest.clearAllMocks();
  });

  // Unit tests...
  describe('create', () => {
    it('should successfully create a new user', async () => {
      const createUserDto = { username: 'testUser', password: 'testPass' };
      mockRepository.create.mockReturnValue(createUserDto); // Mock the response of create
      mockRepository.save.mockResolvedValue(createUserDto); // Mock the response of save

      const result = await service.create(createUserDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should return a user if username matches', async () => {
      const testUser = { username: 'testUser', password: 'testPass' };
      mockRepository.findOne.mockResolvedValue(testUser); // Mock findOne method

      const result = await service.findOne('testUser');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { username: 'testUser' } });
      expect(result).toEqual(testUser);
    });
  });

});
