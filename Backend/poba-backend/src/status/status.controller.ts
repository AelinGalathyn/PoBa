import { Body, Controller, Get, InternalServerErrorException, Param, Post, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { ExternalService } from '../external/external.service';
import { WebshopService } from '../webshop/webshop.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserId } from '../users/decorators/UserId.param';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService,
              private readonly externalService: ExternalService,
              private readonly webshopService: WebshopService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':webshopid')
  @ApiOkResponse({description: 'Visszaküldi a felhasználó létező státuszait.'})
  @ApiNotFoundResponse({description: 'Nincs ilyen azonosítójú webshop.'})
  @ApiUnauthorizedResponse({description: 'Nincs bejelentkezve.'})
  async getStatuses(@UserId() userid: number, @Param('webshopid') webshopid: number){
      let ws = await this.webshopService.findAndValidate(userid, webshopid);
      ws = await this.webshopService.unasLogin(ws);
      const data = await this.externalService.getStatuses(ws);
      return await this.statusService.getStatuses(data);
  }
}
