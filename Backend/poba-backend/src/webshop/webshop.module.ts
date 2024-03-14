import { Module } from '@nestjs/common';
import { WebshopService } from './webshop.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Webshop } from './entities/webshop.entity';
import { Users } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Webshop, Users])],
  providers: [WebshopService, UsersService]
})
export class WebshopModule {}
