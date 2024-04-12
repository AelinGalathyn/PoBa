import {
    Controller,
    Get,
    UseGuards,
    Post,
    Body,
    Res,
    createParamDecorator,
    ExecutionContext, UnauthorizedException, Param, Req, Query, Delete,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginDto } from './auth/login.dto';
import { JwtAuthGuard } from './auth/auth.guard';
import { ExternalService } from './external/external.service';
import { UsersService } from './users/users.service';
import { UserId } from './users/decorators/UserId.param';
import { WebshopService } from './webshop/webshop.service';
import { WebshopId } from './users/decorators/webshopid.param';
import { RegDto } from './auth/dto/reg.dto';
import { ItemService } from './item/item.service';
import { Request, Response } from 'express';
import { ChangePasswordDto } from './users/dto/change-password.dto';
import { Webshop } from './webshop/entities/webshop.entity';
import { ApicallsService } from './external/apicalls/apicalls.service';


@Controller ()
export class AppController{
    constructor (private authService: AuthService,
                 private externalService: ExternalService,
                 private usersService: UsersService,
                 private webshopService: WebshopService,
                 private itemService: ItemService,
                 private apicallsService: ApicallsService) {}

    @Get()
    async checkCookie(@Req()req: Request, @Res()res: Response){
        const token = req.cookies['Authentication'];
        console.log("token : " + token);
        if(token !==undefined){
            const valid = await this.authService.validateToken(token);
            if(valid !== false){
                const user = await this.usersService.findById(valid);
                return res.json({username : user.username});
            }
        }
        return res.json({isValid: false});
    }

    @Post('login')
    async login(@Query() userdto: LoginDto, @Res() res: Response) {
        const { userid,...jwt} = await this.authService.login(userdto);

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
    async reg(@Query() regdto: RegDto, ){
        const {api_key, ...newUser} = regdto;
        if(await this.usersService.findByUName(regdto.username) === null) {
            const user = await this.authService.register(newUser);
            await this.webshopService.newApiKey(user, api_key);
        }
        else {
            return 'User already exists';
        }
    }

    @Post('logout')
    logout(@Res() res: Response) {
        res.cookie('Authentication', '', {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            expires: new Date(0)
        });

        return res.send({ message: 'Logout successful' });
    }

    @UseGuards(JwtAuthGuard)
    @Post('changePassword')
    async changePassword(@UserId() userid, @Query()passwords: ChangePasswordDto){
        const user = await this.usersService.findById(userid);
        const valid = await this.authService.validateUser({username: user.username, password: passwords.opw});
        if(!valid){
            throw new UnauthorizedException('Invalid old password');
        }

        return await this.authService.changePassword(user, passwords.npw);
    }
}

