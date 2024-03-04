import { Module } from '@nestjs/common';
import { DbController } from './db.controller';
import { DbService } from './db.service';
import { PasswordService } from './password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket, Customer, Invoice, Item, Order, Packages, Shipping, User } from './db.dtos';

@Module({
  imports: [
      TypeOrmModule.forFeature([User, Basket, Customer, Invoice, Item, Order, Packages, Shipping]),
    ],
    controllers: [DbController],
    providers: [DbService, PasswordService],
})

export class DbModule {}