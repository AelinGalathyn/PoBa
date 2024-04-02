import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from './decorators/UserId.param';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@UserId()userid){
    const {password, ...user} = await this.usersService.findById(userid);
    return user;
  }
}
