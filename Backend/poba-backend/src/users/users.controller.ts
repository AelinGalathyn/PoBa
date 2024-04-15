import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from './decorators/UserId.param';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOkResponse({description: 'Visszaküldi a felhasználó nevét és azonosítóját.'})
  @ApiUnauthorizedResponse({description: 'Nincs bejelentkezve.'})
  async getProfile(@UserId()userid){
    const {password, ...user} = await this.usersService.findById(userid);
    return user;
  }
}
