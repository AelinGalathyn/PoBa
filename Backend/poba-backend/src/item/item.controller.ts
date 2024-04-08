import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from '../users/decorators/UserId.param';
import { ExternalService } from '../external/external.service';
import { WebshopService } from '../webshop/webshop.service';
import { InputItemDto } from './entities/item.entity';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly externalService: ExternalService,
    private readonly webshopService: WebshopService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@UserId() userid: number, @Query('webshopid') webshopid: number) {
    try {
      let ws = await this.webshopService.findAndValidate(userid, webshopid);
      ws = await this.webshopService.unasLogin(ws);
      const data = await this.externalService.getItems(ws);
      console.log(data);
      return this.itemService.makeItems(data);
    } catch (err) {
      return err;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrder(@UserId() userid: number, @Body('webshopid') webshopid: number, @Param('id')id: string){
    let ws = await this.webshopService.findAndValidate(userid, webshopid);
    ws = await this.webshopService.unasLogin(ws);
    const data = await this.externalService.getItemsById(ws, id);
    console.log(id);
    console.log(data);
    return this.itemService.makeItems(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('setStock')
  async setStock(@UserId() userid: number, @Query() itemInput: InputItemDto) {
    let ws = await this.webshopService.findAndValidate(userid, itemInput.webshopid);
    ws = await this.webshopService.unasLogin(ws);
    const status = await this.externalService.setStock(ws, itemInput.sku, itemInput.stock);
    console.log(status);
    return status;
  }
}
