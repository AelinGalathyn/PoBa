import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalService } from '../external/external.service';
import { HttpModule } from '@nestjs/axios';
import { Item } from '../external/entities/item.entity';
import { Orders } from '../external/entities/orders.entity';
import { Customer } from '../external/entities/customer.entity';
import { Invoice } from '../external/entities/invoice.entity';
import { Basket } from '../external/entities/basket.entity';
import { Packages } from '../external/entities/packages.entity';
import { Shipping } from '../external/entities/shipping.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { WebshopService } from '../webshop/webshop.service';
import { Users } from '../users/entities/users.entity';
import { Webshop } from '../webshop/entities/webshop.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Item, Orders, Customer, Invoice, Basket, Packages,
   Shipping, Users, Webshop]), UsersModule],
  providers: [DbService, ExternalService, UsersService, WebshopService],
  exports: [DbService]
})
export class DbModule {}
