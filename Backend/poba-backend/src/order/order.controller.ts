import { Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('upload')
  async uploadOrders(){
    await this.orderService.uploadOrders();
  }
}
