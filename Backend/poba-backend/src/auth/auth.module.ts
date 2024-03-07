import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';

@Module({
  imports: [UsersModule, JwtModule.register(jwtConstants)],
  controllers: [],
  providers: [AuthService, PasswordService],
  exports: [AuthService]
})
export class AuthModule {}
