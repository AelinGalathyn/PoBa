import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginDto } from './auth/login.dto';


@Controller ()
export class AppController{
    constructor (private appService: AppService,
                 private authService: AuthService) {}

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
    async login(@Body() user: LoginDto){
        return this.authService.login(user);
    }

    @Post('auth/reg')
    async reg(@Body() user: CreateUserDto){
        return this.authService.register(user);
    }
}
