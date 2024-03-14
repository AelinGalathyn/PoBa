import { Module } from '@nestjs/common';
import { ExternalService } from './external.service';
import { HttpModule } from '@nestjs/axios';
import { DbModule } from '../db/db.module';
import { UsersService } from '../users/users.service';
import { WebshopService } from '../webshop/webshop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { UsersModule } from '../users/users.module';
import { Webshop } from '../webshop/entities/webshop.entity';

@Module({
  imports: [HttpModule, DbModule, TypeOrmModule.forFeature([Users, Webshop]), UsersModule],
  providers: [ExternalService, UsersService, WebshopService],
  exports: [ExternalService]
})
export class ExternalModule {}
