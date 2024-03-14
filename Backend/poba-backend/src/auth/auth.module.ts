import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { WebshopService } from '../webshop/webshop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Webshop } from '../webshop/entities/webshop.entity';

@Module({
  imports: [UsersModule,
    JwtModule.register(jwtConstants),
    PassportModule.register({defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([Webshop])],
  controllers: [],
  providers: [AuthService, PasswordService, JwtStrategy, WebshopService],
  exports: [AuthService]
})
export class AuthModule {}
