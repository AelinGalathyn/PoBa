import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, JwtModule.register(jwtConstants), PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [],
  providers: [AuthService, PasswordService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
