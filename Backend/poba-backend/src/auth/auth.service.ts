import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { LoginDto } from './login.dto';
import { Users } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private pwService: PasswordService,
    ){}

    async validateUser(loginUser: LoginDto): Promise<Partial<Users>>{
        const user = await this.usersService.findOne(loginUser.username);
        if(user&&await this.pwService.verifyPassword(user.password, loginUser.password)){
            const {password, ...result} = user;
            return result;
        }
        throw new UnauthorizedException();
    }

    async login(loginUser: LoginDto): Promise<{ access_token: string }> {
        const user = await this.validateUser(loginUser);

        const payload = { username: user.username, sub: user.userid }; // Adjust 'userId' as necessary based on your
        // User model

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
}
