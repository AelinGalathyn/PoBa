import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/db/db.dtos';
import { UserService } from './user.service';
import { PasswordService } from 'src/db/password.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly pwService: PasswordService) { }

    @Post('reg')
    async regUser(@Body('') userDto: User) {
        if (userDto.username.length === 0) {
            throw new Error('Please enter a username!');
        }
        else if (userDto.password.length === 0) {
            throw new Error('Please enter a password!');
        }
        else {
            const passwordEncoded = await this.pwService.hashPassword(userDto.password);
            return this.userService.regUser(userDto.username, passwordEncoded);
        }
    }

    @Post('new-api')
    async newAPI(@Body('apiKey') apikey: string, @Body('userid') userid: string) {
        if (apikey === undefined) {
            throw new Error('Please enter an API key!');
        }
        else if (userid === undefined) {
            throw new Error('Please enter a userid!');
        }
        else {
            const userId = parseInt(userid);
            this.userService.newAPI(apikey, userId);
        }
    }

    @Post('login')
    async login(@Body('username')userName: string, @Body('password')password: string){
        return this.userService.login(userName, password);
    }
}
