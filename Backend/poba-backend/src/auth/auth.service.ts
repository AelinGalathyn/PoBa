import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';
import { Users } from '../users/entities/users.entity';
import { WebshopService } from '../webshop/webshop.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private pwService: PasswordService,
        private webshopService: WebshopService
    ){}

    async validateUser(loginUser: LoginDto){
        const user = await this.usersService.findOne(loginUser.userid);
        if(user&&await this.pwService.verifyPassword(user.password, loginUser.password)){
            const {password, ...result} = user;
            const shops = await this.webshopService.getShopsByUser(user.userid);
            const webshopid = shops[0].webshopid;
            const finalresult = {
                ...result,
                webshopid,
            }
            return finalresult;
        }
        throw new UnauthorizedException();
    }

    async login(loginUser: LoginDto): Promise<{ access_token: string }> {
        const user = await this.validateUser(loginUser);

        const payload = { username: user.username, sub: user.userid, webshopid: user.webshopid };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }


    async register(user: CreateUserDto) {
        const hashedPassword = await this.pwService.hashPassword(user.password);
        const newUser = await this.usersService.create({
          ...user,
          password: hashedPassword,
        });
        const { password, ...result } = newUser;
        return result;
    }

    async changeJwt(webshopid: number){
        const user = await this.webshopService.getUser(webshopid);
        const payload = {username: user.username, sub: user.userid, webshopid: webshopid};
        return{
            access_token: this.jwtService.sign(payload),
        };
    }
}
