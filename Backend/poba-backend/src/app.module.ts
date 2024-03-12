import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from './auth/password.service';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExternalModule } from './external/external.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'nojminoj01',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: false,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule, AuthModule, ExternalModule, DbModule],
  controllers: [AppController],
  providers: [AppService, PasswordService, ExternalModule],
})

export class AppModule {
  constructor(private dataSource: DataSource) { }
}
