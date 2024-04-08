import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from '../users/decorators/UserId.param';
import { WebshopService } from '../webshop/webshop.service';
import { Webshop } from '../webshop/entities/webshop.entity';
import { ExternalService } from '../external/external.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
              private readonly webshopService: WebshopService,
              private readonly externalService: ExternalService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@UserId() userid: number, @Body('webshopid') webshopid: number) {
    let ws = await this.webshopService.findAndValidate(userid, webshopid);
    ws = await this.webshopService.unasLogin(ws);
    const data = await this.externalService.getOrders(ws);
    return this.ordersService.makeOrders(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all/:id')
  async getOneOrder(@UserId() userid: number,@Body('webshopid') webshopid : number, @Param('id') orderId: number) {
    let ws = await this.webshopService.findAndValidate(userid, webshopid);
    ws = await this.webshopService.unasLogin(ws);
    const data = await this.externalService.getOrders(ws);
    const orders = this.ordersService.makeOrders(data);
    return orders.then(data => data.find(order => order.orderid === orderId));
  }
}
