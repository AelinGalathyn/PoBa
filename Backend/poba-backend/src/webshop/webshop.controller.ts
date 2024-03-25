import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { WebshopService } from './webshop.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from '../users/decorators/UserId.param';
import { UsersService } from '../users/users.service';

@Controller('webshop')
export class WebshopController {
  constructor(private readonly webshopService: WebshopService,
              private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async newWebshop(@UserId() userid: number, @Query('api_key')apikey: string){
    const user = await this.usersService.findById(userid);
    console.log(apikey);
    await this.webshopService.newApiKey(user, apikey);
  }


  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getAllWebshops(@UserId()userid: number){
    const webshops = await this.webshopService.getShopsByUser(userid);
    return webshops.map(webshop => ({ "webshopid": webshop.webshopid, "name": webshop.name }));
  }
}