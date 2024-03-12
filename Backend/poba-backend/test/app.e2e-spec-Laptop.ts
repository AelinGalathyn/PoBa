import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../src/users/users.service';
import { UsersModule } from '../src/users/users.module';
import { Users } from '../src/users/entities/user.entity';

describe('UsersService (e2e)', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres', // or your DB type
          host: process.env.TEST_DB_HOST,
          port: parseInt(process.env.TEST_DB_PORT, 10),
          username: process.env.TEST_DB_USERNAME,
          password: process.env.TEST_DB_PASSWORD,
          database: process.env.TEST_DB_NAME,
          entities: [Users],
          synchronize: true, // use migrations in production
        }),
        UsersModule,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    // Optionally, add teardown logic to close DB connections or remove test data
  });

  it('should create a new user', async () => {
    const createUserDto = { username: 'John Doe', password: 'teszt123' };
    const user = await service.create(createUserDto);

    expect(user).toBeDefined();
    expect(user.userid).toBeDefined();
    expect(user.username).toEqual(createUserDto.username);

    // Clean up
    await service.remove(user.userid);
  });

  // Add more tests for read, update, delete operations
});
