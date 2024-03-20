import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WebshopService } from './webshop.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from '../users/decorators/UserId.param';
import { UsersService } from '../users/users.service';

@Controller('webshop')
export class WebshopController {
  constructor(private readonly webshopService: WebshopService,
              private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async newWebshop(@UserId() userid: number, @Body('api_key')apikey: string){
    const user = await this.usersService.findById(userid);
    await this.webshopService.newApiKey(user, apikey);
  }
}