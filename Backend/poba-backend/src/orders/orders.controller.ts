import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from '../users/decorators/UserId.param';
import { WebshopService } from '../webshop/webshop.service';
import { Webshop } from '../webshop/entities/webshop.entity';
import { ExternalService } from '../external/external.service';
import { GetOrderInput, SetStatusInput } from './entities/orderinput.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
              private readonly webshopService: WebshopService,
              private readonly externalService: ExternalService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get(':webshopid')
  async getAll(@UserId() userid: number, @Param('webshopid') webshopid: number) {
    let ws = await this.webshopService.findAndValidate(userid, +webshopid);
    ws = await this.webshopService.unasLogin(ws);
    const data = await this.externalService.getOrders(ws);
    return await this.ordersService.makeOrders(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':webshopid/:id')
  async getOrder(@UserId() userid: number, @Param() getOrderInput: GetOrderInput){
    console.log(getOrderInput)
    let ws = await this.webshopService.findAndValidate(userid, +getOrderInput.webshopid);
    ws = await this.webshopService.unasLogin(ws);
    const data = await this.externalService.getOrderById(ws, getOrderInput.id);
    console.log(this.ordersService.makeOrders(data))
    return this.ordersService.makeOrders(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':webshopid/:id/:statusid')
  async setStatus(@UserId() userid: number, @Param() setStatusInput: SetStatusInput){
    let ws = await this.webshopService.findAndValidate(userid, +setStatusInput.webshopid);
    ws = await this.webshopService.unasLogin(ws);
    const data = await this.externalService.getOrderById(ws, setStatusInput.id);
    const order = await this.ordersService.makeOrders(data);
    return this.externalService.setStatus(ws, order[0], +setStatusInput.statusid);
  }
}
