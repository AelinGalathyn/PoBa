import {
    Controller,
    Get,
    UseGuards,
    Request,
    Post,
    Body,
    Res,
    createParamDecorator,
    ExecutionContext, UnauthorizedException, Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response} from 'express';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginDto } from './auth/login.dto';
import { JwtAuthGuard } from './auth/auth.guard';
import { ExternalService } from './external/external.service';
import { UsersService } from './users/users.service';
import { UserId } from './auth/UserId.param';
import { WebshopService } from './webshop/webshop.service';


@Controller ()
export class AppController{
    constructor (private appService: AppService,
                 private authService: AuthService,
                 private externalService: ExternalService,
                 private usersService: UsersService,
                 private webshopService: WebshopService) {}

    @Get()
    getHello(){
        return "HELLLLLLLOO";
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@UserId() userid){
        return await this.usersService.returnOne(userid);
    }

    @Post('auth/login')
    async login(@Body() user: LoginDto, @Res() res: Response) {
        const jwt = await this.authService.login(user); // Ensure this returns a token

        if (!jwt || !jwt.access_token) {
            throw new UnauthorizedException('Failed to generate token');
        }

        res.cookie('Authentication', jwt.access_token, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
        });

        return res.send({ message: 'Login successful' });
    }

    @Post('auth/reg')
    async reg(@Body() user: CreateUserDto){
        return this.authService.register(user);
    }

    @Get('/db/loaditems')
    async loadItems(webshopid: number){
        this.externalService.getItems(webshopid);
    }

    @UseGuards(JwtAuthGuard)
    @Post('setWebshop/:id')
    async changeWebshop(@Param('id')id: number, @Res() res: Response){
        const newJwt = this.authService.changeJwt(id);
    }
}

