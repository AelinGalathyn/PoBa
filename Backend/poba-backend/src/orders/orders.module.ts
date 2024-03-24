import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { WebshopModule } from '../webshop/webshop.module';
import { ExternalModule } from '../external/external.module';

@Module({
  imports: [WebshopModule, OrdersModule, ExternalModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
