import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordService } from './password.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // AuthService is the service we're testing
      providers: [
        AuthService,
        // Provide mocks for dependencies
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: PasswordService, useValue: mockPasswordService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


describe('AuthService - Register', () => {
  let authService: AuthService;
  // Mock dependencies
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, PasswordService],
    })
    // Assume UsersService and PasswordService are properly mocked
    .overrideProvider(UsersService)
    .useValue(mockUsersService)
    .overrideProvider(PasswordService)
    .useValue(mockPasswordService)
    .compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should successfully register a new user', async () => {
    const newUser = { username: 'testuser', password: 'testpass' };
    const result = await authService.register(newUser);
    expect(result).toBeDefined();
    expect(mockUsersService.create).toHaveBeenCalledWith({username: 'testuser', password: 'hashed_testpass'});
  });

  // Add more scenarios as needed, such as handling duplicate usernames
});

describe('AuthService - Login', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: PasswordService, useValue: mockPasswordService },
        { provide: getRepositoryToken(Users), useValue: mockUsersRepository },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should successfully login with correct credentials', async () => {
    const userCredentials = { username: 'testuser', password: 'testpass' };
    const expectedToken = "expectedToken";
    mockUsersService.findOne.mockResolvedValue(userCredentials);
    mockPasswordService.verifyPassword.mockResolvedValue(true);
    mockJwtService.sign.mockReturnValue(expectedToken);

    const result = await authService.login(userCredentials);
    expect(result).toBeDefined();
    expect(result.access_token).toEqual(expectedToken);
  });

  // Test login with incorrect credentials
  it('should not login with incorrect credentials', async () => {
    const userCredentials = { username: 'testuser', password: 'wrongpass' };
    mockUsersService.findOne.mockResolvedValue(null);

    await expect(authService.login(userCredentials)).rejects.toThrow();
  });
});


const mockUsersService = {
  findOne: jest.fn((username: string) => {
    // Simulate fetching user by username
    if (username === 'existingUser') {
      return Promise.resolve({ username: 'existingUser', password: 'hashedPassword' }); // Example user
    }
    return Promise.resolve(null); // User not found
  }),
  create: jest.fn((userDto) => {
    // Simulate creating a new user
    return Promise.resolve({ id: Date.now(), ...userDto }); // Example created user
  }),
};


const mockPasswordService = {
  hashPassword: jest.fn((password: string) => {
    // Simulate password hashing
    return Promise.resolve(`hashed_${password}`); // Example hashed password
  }),
  verifyPassword: jest.fn((hash: string, inputPassword: string) => {
    // Simulate password verification (simplified logic)
    return Promise.resolve(hash === `hashed_${inputPassword}`);
  }),
};

const mockJwtService = {
  sign: jest.fn((payload) => {
    // Simulate JWT signing
    return `token_${payload.sub}`; // Example token generation based on user ID
  }),
};

const mockUsersRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  // Add other methods used by your UsersService
};

