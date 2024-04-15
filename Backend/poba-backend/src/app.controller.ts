import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Res,
  createParamDecorator,
  ExecutionContext, UnauthorizedException, Param, Req, Query, Delete, ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginDto } from './auth/dto/login.dto';
import { JwtAuthGuard } from './auth/auth.guard';
import { ExternalService } from './external/external.service';
import { UsersService } from './users/users.service';
import { UserId } from './users/decorators/UserId.param';
import { WebshopService } from './webshop/webshop.service';
import { WebshopId } from './users/decorators/webshopid.param';
import { RegDto } from './auth/dto/reg.dto';
import { ItemService } from './item/item.service';
import { Request, Response } from 'express';
import { ChangePasswordDto } from './auth/dto/change-password.dto';
import { Webshop } from './webshop/entities/webshop.entity';
import { ApicallsService } from './external/apicalls/apicalls.service';
import {
  ApiAcceptedResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private authService: AuthService,
              private externalService: ExternalService,
              private usersService: UsersService,
              private webshopService: WebshopService,
              private itemService: ItemService,
              private apicallsService: ApicallsService) {
  }

  @Get()
  @ApiOkResponse({
    description: 'Ellenőrzi, hogy a kliensnek van e authentication tokenje és' +
      ' visszaküldi' +
      ' a felhasználónevet a token alapján vagy a token invalidságát.',
  })
  async checkCookie(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['Authentication'];
    console.log('token : ' + token);
    if (token !== undefined) {
      const valid = await this.authService.validateToken(token);
      if (valid !== false) {
        const user = await this.usersService.findById(valid);
        return res.json({ username: user.username });
      }
    }
    return res.json({ isValid: false });
  }

  @Post('login')
  @ApiCreatedResponse({
    description: 'Sikeres bejelentkezéskor visszaküldi a felhasználóhoz tartozó első webshop' +
      ' ID-ját és a felhasználónevét, valamint kiküldi az authentication tokent cookie-ként.',
  })
  @ApiUnauthorizedResponse({ description: 'Helytelen felhasználónév vagy jelszó esetén errort dob vissza.' })
  async login(@Query() userdto: LoginDto, @Res() res: Response) {
    const { userid, ...jwt } = await this.authService.login(userdto);

    if (!jwt || !jwt.access_token) {
      throw new UnauthorizedException('Failed to generate token');
    }

    res.cookie('Authentication', jwt.access_token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });

    const webshop = await this.webshopService.getShopsByUser(userid);
    const webshopid = webshop[0].webshopid;
    const user = await this.usersService.findById(userid);
    await this.webshopService.newToken(webshopid);
    return res.send({ message: 'Login successful', webshopid: webshopid, username: user.username });
  }

  @Post('reg')
  @ApiConflictResponse({
    description: 'Errort ad vissza, ha az adott felhasználónévvel vagy API kulccsal létezik már' +
      ' webshop a rendszerben.',
  })
  @ApiCreatedResponse({ description: 'Sikeresen létrehozta a felhasználót.' })
  async reg(@Query() regdto: RegDto) {
    const { api_key, ...newUser } = regdto;
    if (await this.usersService.findByUName(regdto.username) === null) {
      const user = await this.authService.register(newUser);
      await this.webshopService.newApiKey(user, api_key);
    } else {
      throw new ConflictException('User already exists');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiAcceptedResponse({ description: 'Sikeresen kijelentkezett és a cookie törlésre került.' })
  logout(@Res() res: Response, @Req() req: Request) {
    res.cookie('Authentication', '', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      expires: new Date(0),
    });

    return res.send({ message: 'Logout successful' }).status(202);
  }

  @UseGuards(JwtAuthGuard)
  @Post('changePassword')
  @ApiUnauthorizedResponse({ description: 'Helytelen régi jelszót adott meg a felhasználó.' })
  @ApiCreatedResponse({ description: 'Sikeresen megváltozott a felhasználó jelszava.' })
  async changePassword(@UserId() userid, @Query() passwords: ChangePasswordDto) {
    const user = await this.usersService.findById(userid);
    const valid = await this.authService.validateUser({ username: user.username, password: passwords.opw });
    if (!valid) {
      throw new UnauthorizedException('Invalid old password');
    }

    return await this.authService.changePassword(user, passwords.npw);
  }
}

