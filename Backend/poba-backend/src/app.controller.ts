import {
    Controller,
    Get,
    UseGuards,
    Post,
    Body,
    Res,
    createParamDecorator,
    ExecutionContext, UnauthorizedException, Param, Req,
} from '@nestjs/common';
import { AppService } from './app.service';
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


@Controller ()
export class AppController{
    constructor (private appService: AppService,
                 private authService: AuthService,
                 private externalService: ExternalService,
                 private usersService: UsersService,
                 private webshopService: WebshopService,
                 private itemService: ItemService) {}

    @Get()
    checkCookie(){
        return "HELLLLLLLOO";
    }

    @Post('auth/login')
    async login(@Body() userdto: LoginDto, @Res() res: Response) {
        const { userid,...jwt} = await this.authService.login(userdto); // Ensure this returns a token

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
        await this.webshopService.newToken(webshopid);

        return res.send({ message: 'Login successful', webshopid: webshopid });
    }

    @Post('auth/reg')
    async reg(@Body() regdto: RegDto, ){
        const {api_key, ...newUser} = regdto;
        if(await this.usersService.findByUName(regdto.username) === null) {
            const user = await this.authService.register(newUser);
            await this.webshopService.newApiKey(user, api_key);
        }
        else {
            return 'User already exists';
        }
    }

    async validateToken(@Req() req: Request, @Res() res: Response){
        const token = req.cookies['Authentication'];
        const isValid = token ? await this.authService.validateToken(token) : false;
        if(!isValid){
            return res.json({isValid});
        }
        else{
            const webshop = await this.webshopService.getShopsByUser(isValid);

        }
    }
}

