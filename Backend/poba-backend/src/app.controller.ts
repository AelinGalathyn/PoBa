import { Controller, Get, UseGuards, Request, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response} from 'express';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginDto } from './auth/login.dto';
import { JwtAuthGuard } from './auth/auth.guard';
import { ExternalService } from './external/external.service';


@Controller ()
export class AppController{
    constructor (private appService: AppService,
                 private authService: AuthService,
                 private externalService: ExternalService) {}

    @Get()
    getHello(){
        return "HELLLLLLLOO";
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }

    @Post('auth/login')
    async login(@Body() user: LoginDto, @Res() res: Response){
        const jwt = this.authService.login(user);

        res.cookie('Authentication', jwt,{
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
        });

        return res.send({message: 'Login successful'});
    }

    @Post('auth/reg')
    async reg(@Body() user: CreateUserDto){
        return this.authService.register(user);
    }

    @Get('/db/loaditems')
    async loadItems(@Body('token')token: string, @Body('userid')userid: string){
        this.externalService.getItems(token, +userid);
    }
}
