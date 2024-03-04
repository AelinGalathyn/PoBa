import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Basket, Customer, Invoice, Item, Order, Packages, Shipping } from './db/db.dtos';
import { UserModule } from './user/user.module';
import { PasswordService } from './db/password.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'poba-project-server.mysql.database.azure.com',
      port: 3306,
      username: 'izizvdeqos',
      password: 'SYW8433LFY7EPV7K$',
      database: 'poba-project-database',
      entities: [User, Basket, Customer, Invoice, Item, Order, Packages, Shipping],
      synchronize: false,
      ssl: true,
    }),
    UserModule, HttpModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PasswordService],
})

export class AppModule {}
