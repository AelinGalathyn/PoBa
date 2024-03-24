import { Module } from '@nestjs/common';
import { WebshopModule } from '../webshop/webshop.module';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { ExternalService } from './external.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiCalls } from './entities/apicalls.entity';
import { ApicallsService } from './apicalls/apicalls.service';

@Module({
  imports: [
    WebshopModule,
    UsersModule,
    HttpModule,
    TypeOrmModule.forFeature([ApiCalls]),
  ],
  providers: [ExternalService, ApicallsService],
  exports: [ExternalService, ApicallsService],
})
export class ExternalModule {}
