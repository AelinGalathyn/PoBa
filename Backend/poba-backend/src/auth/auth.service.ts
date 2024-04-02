import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';
import { WebshopService } from '../webshop/webshop.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private pwService: PasswordService,
    ){}

    async validateUser(loginUser: LoginDto){
        const user = await this.usersService.findByUName(loginUser.username);
        if(!user){
            throw new UnauthorizedException('User not found');
        }
        const uPassword = await this.usersService.getPassword(loginUser.username);
        const validPassword = await this.pwService.verifyPassword(uPassword, loginUser.password);
        if(!validPassword){
            throw new UnauthorizedException('Invalid password.');
        }
        return user;
    }

    async validateToken(token: string){
        try {
            const payload = this.jwtService.verify(token);
            return payload.userid;
        } catch (error){
            return false;
        }
    }

    async login(loginUser: LoginDto) {
        try {
            const user = await this.validateUser(loginUser);

            const payload = { username: user.username, sub: user.userid, };

            return {
                access_token: this.jwtService.sign(payload),
                userid: user.userid,
            };
        } catch (err) {
            throw err;
        }
    }


    async register(user: CreateUserDto) {
        try {
            const hashedPassword = await this.pwService.hashPassword(user.password);
            const newUser = await this.usersService.create({
                ...user,
                password: hashedPassword,
            });
            const { password, ...result } = newUser;
            return result;
        } catch (err) {
            throw new InternalServerErrorException('Unable to register user');
        }
    }
}
