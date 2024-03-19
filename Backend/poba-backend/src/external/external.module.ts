import { Module } from '@nestjs/common';
import { WebshopModule } from '../webshop/webshop.module';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { ExternalService } from './external.service';

@Module({
  imports: [
    WebshopModule,
    UsersModule,
    HttpModule,
  ],
  providers: [ExternalService],
  exports: [ExternalService],
})
export class ExternalModule {}
