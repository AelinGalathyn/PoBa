import { Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { WebshopService } from './webshop.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from '../users/decorators/UserId.param';
import { UsersService } from '../users/users.service';

@Controller('webshop')
export class WebshopController {
  constructor(private readonly webshopService: WebshopService,
              private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async newWebshop(@UserId() userid: number, @Query('api_key')apikey: string){
    const user = await this.usersService.findById(userid);
    console.log(apikey);
    const newWebshop = await this.webshopService.newApiKey(user, apikey);
    return newWebshop.webshopid;
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllWebshops(@UserId()userid: number){
    const webshops = await this.webshopService.getShopsByUser(userid);
    return webshops.map(webshop => ({ "webshopid": webshop.webshopid, "name": webshop.name }));
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeWebshop(@UserId() userid, @Query('webshopid') webshopid: number){
    let ws = await this.webshopService.findAndValidate(userid, +webshopid);
    return await this.webshopService.deleteWebshop(ws);
  }
}