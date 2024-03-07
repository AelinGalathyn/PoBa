import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

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
          entities: [User],
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
    const createUserDto = { name: 'John Doe', email: 'john@example.com' };
    const user = await service.create(createUserDto);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toEqual(createUserDto.name);

    // Clean up
    await service.remove(user.id);
  });

  // Add more tests for read, update, delete operations
});
