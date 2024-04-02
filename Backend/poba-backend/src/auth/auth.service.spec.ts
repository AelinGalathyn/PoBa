import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';

// Mocking UsersService
const usersServiceMock: jest.Mocked<Partial<UsersService>> = {
  findByUName: jest.fn(),
  getPassword: jest.fn(),
  create: jest.fn(),
};

// Mocking JwtService
const jwtServiceMock: jest.Mocked<Partial<JwtService>> = {
  sign: jest.fn(),
  verify: jest.fn(),
};

// Mocking PasswordService
const passwordServiceMock: jest.Mocked<Partial<PasswordService>> = {
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
};

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: PasswordService, useValue: passwordServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  // Reset mocks before each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should validate and return the user for correct credentials', async () => {
      const loginDto = { username: 'user', password: 'pass' };
      const mockUser = { username: 'user', userid: 1, webshops: [] };
      usersServiceMock.findByUName.mockResolvedValue(mockUser);
      usersServiceMock.getPassword.mockResolvedValue('hashedPassword');
      passwordServiceMock.verifyPassword.mockResolvedValue(true);

      const result = await authService.validateUser(loginDto);

      expect(result).toEqual(mockUser);
      expect(usersServiceMock.findByUName).toHaveBeenCalledWith('user');
      expect(passwordServiceMock.verifyPassword).toHaveBeenCalledWith('hashedPassword', 'pass');
    });

    it('should throw UnauthorizedException for an invalid password', async () => {
      const loginDto = { username: 'user', password: 'wrongPass' };
      usersServiceMock.findByUName.mockResolvedValue({ username: 'user', userid: 1, webshops: [] });
      usersServiceMock.getPassword.mockResolvedValue('hashedPassword');
      passwordServiceMock.verifyPassword.mockResolvedValue(false);

      await expect(authService.validateUser(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      const loginDto = { username: 'nonexistentUser', password: 'pass' };
      usersServiceMock.findByUName.mockResolvedValue(null);

      await expect(authService.validateUser(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });


  describe('validateToken', () => {
    it('should return a userid if token is valid', async () => {
      const validToken = 'valid.token.here';
      const expectedUserId = 'user123';
      jwtServiceMock.verify.mockReturnValue({ userid: expectedUserId });

      const result = await authService.validateToken(validToken);

      expect(result).toEqual(expectedUserId);
      expect(jwtServiceMock.verify).toHaveBeenCalledWith(validToken);
    });

    it('should return false if token is invalid', async () => {
      const invalidToken = 'invalid.token.here';
      jwtServiceMock.verify.mockImplementation(() => {
        throw new Error('Token verification failed');
      });

      const result = await authService.validateToken(invalidToken);

      expect(result).toBeFalsy();
    });
  });

  describe('login', () => {
    it('should return access token and userid for correct credentials', async () => {
      const loginUser = { username: 'validUser', password: 'validPass' };
      const mockUser = { username: 'validUser', userid: 1, webshops: [] };
      usersServiceMock.findByUName.mockResolvedValue(mockUser);
      usersServiceMock.getPassword.mockResolvedValue('hashedPassword');
      passwordServiceMock.verifyPassword.mockResolvedValue(true);
      jwtServiceMock.sign.mockReturnValue('valid.token.here');

      const result = await authService.login(loginUser);

      expect(result).toBeDefined();
      expect(result.access_token).toEqual('valid.token.here');
      expect(result.userid).toEqual(mockUser.userid);
    });

    it('should throw UnauthorizedException for incorrect credentials', async () => {
      const loginUser = { username: 'invalidUser', password: 'invalidPass' };
      usersServiceMock.findByUName.mockResolvedValue(null); // Simulating user not found

      await expect(authService.login(loginUser)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should successfully register a new user and return their details', async () => {
      const createUserDto: CreateUserDto = { username: 'newUser', password: 'newPass' };
      const mockNewUser = { ...createUserDto, userid: 2, password: 'hashed_newPass', webshops: [] };
      passwordServiceMock.hashPassword.mockResolvedValue('hashed_newPass');
      usersServiceMock.create.mockResolvedValue(mockNewUser);

      const result = await authService.register(createUserDto);

      expect(result).toBeDefined();
      expect(result).not.toHaveProperty('password');
      expect(result.username).toEqual(createUserDto.username);
      expect(passwordServiceMock.hashPassword).toHaveBeenCalledWith(createUserDto.password);
      expect(usersServiceMock.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: 'hashed_newPass',
      });
    });

    it('should throw InternalServerErrorException when registration fails', async () => {
      const createUserDto = { username: 'newUser', password: 'newPass' };
      usersServiceMock.create.mockRejectedValue(new Error('Mock DB error'));

      await expect(authService.register(createUserDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

});
