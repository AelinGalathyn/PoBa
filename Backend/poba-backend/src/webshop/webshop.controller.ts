import { Controller, Delete, Get, NotFoundException, Post, Query, UseGuards } from '@nestjs/common';
import { WebshopService } from './webshop.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from '../users/decorators/UserId.param';
import { UsersService } from '../users/users.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('webshop')
@Controller('webshop')
export class WebshopController {
  constructor(private readonly webshopService: WebshopService,
              private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({description: 'Létrehozta az új webshopot és visszaküldi az azonosítóját.'})
  @ApiConflictResponse({description: 'Már létezik webshop ezzel az apikulccsal.'})
  @ApiUnauthorizedResponse({description: 'Nincs bejelentkezve.'})
  async newWebshop(@UserId() userid: number, @Query('api_key')apikey: string){
    const user = await this.usersService.findById(userid);
    console.log(apikey);
    const newWebshop = await this.webshopService.newApiKey(user, apikey);
    return newWebshop.webshopid;
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({description: 'Visszaküldi a felhasználó webshopjainak a neveit és azonosítóit.'})
  @ApiUnauthorizedResponse({description: 'Nincs bejelentkezve.'})
  async getAllWebshops(@UserId()userid: number){
    const webshops = await this.webshopService.getShopsByUser(userid);
    return webshops.map(webshop => ({ "webshopid": webshop.webshopid, "name": webshop.name }));
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOkResponse({description: 'A webshop sikeresen törlésre került.'})
  @ApiNotFoundResponse({description: 'A webshop nem létezik'})
  @ApiUnauthorizedResponse({description: 'Nincs bejelentkezve.'})
  async removeWebshop(@UserId() userid, @Query('webshopid') webshopid: number){
      let ws = await this.webshopService.findAndValidate(userid, +webshopid);
      return  await this.webshopService.deleteWebshop(ws);
  }
}