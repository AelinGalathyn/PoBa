import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from '../users/decorators/UserId.param';
import { ExternalService } from '../external/external.service';
import { WebshopService } from '../webshop/webshop.service';

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
    try{
      const ws = await this.webshopService.findAndValidate(userid, webshopid);
      const data = await this.externalService.getItems(ws);
      return this.itemService.makeItems(data);
    }catch(err){
      return err;
    }
  }
}
