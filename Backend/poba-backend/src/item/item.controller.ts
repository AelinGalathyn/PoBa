import { Body, Controller, Get, InternalServerErrorException, Param, Post, Query, UseGuards } from '@nestjs/common';
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
      return await this.itemService.makeItems(data);
    } catch (err) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrder(@UserId() userid: number, @Body('webshopid') webshopid: number, @Param('id')id: string){
    let ws = await this.webshopService.findAndValidate(userid, webshopid);
    ws = await this.webshopService.unasLogin(ws);
    const data = await this.externalService.getItemsById(ws, id);
    return this.itemService.makeItems(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('setStock')
  async setStock(@UserId() userid: number, @Query() itemInput: InputItemDto) {
    let ws = await this.webshopService.findAndValidate(userid, itemInput.webshopid);
    ws = await this.webshopService.unasLogin(ws);
    return await this.externalService.setStock(ws, itemInput.sku, itemInput.stock);
  }
}
