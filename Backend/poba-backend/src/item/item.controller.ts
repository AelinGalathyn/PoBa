import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from '../users/decorators/UserId.param';
import { ExternalService } from '../external/external.service';
import { WebshopService } from '../webshop/webshop.service';
import { Webshop } from '../webshop/entities/webshop.entity';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly externalService: ExternalService,
    private readonly webshopService: WebshopService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@UserId() userid: number, @Param('webshopid')webshopid: number){
    let ws: Webshop;
    let data: any[];
    try{
      ws = await this.webshopService.getWebshopById(webshopid);
    }catch{
      return 'No webshop by this id.'
    }
    try {
      data = await this.externalService.getItems(ws);
      console.log(data);
    }
    catch{
      ws = await this.webshopService.newToken(ws.webshopid);
      data = await this.externalService.getItems(ws);
      console.log('2....'+data);
    }
    return this.itemService.makeItems(data);
  }
}
