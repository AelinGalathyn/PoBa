import { Body, Controller, Get, UseGuards } from '@nestjs/common';
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
              private readonly externalService: ExternalService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@UserId() userid: number, @Body('webshopid')webshopid: number){
    let ws: Webshop;
    let data: any[];
    try{
      ws = await this.webshopService.getWebshopById(webshopid);
    }catch{
      return 'No webshop by this id.'
    }
    try {
      data = await this.externalService.getItems(ws);
    }
    catch{
      ws = await this.webshopService.newToken(ws.webshopid);
      data = await this.externalService.getItems(ws);
    }
    //return this.ordersService.makeItems(data);
    //TODO: ezt befejezni, különben nem tudok tovább haladni
  }
}
