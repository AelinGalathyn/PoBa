import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/db.dtos';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordService } from 'src/db/password.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, PasswordService],
    controllers: [UserController],
    exports: [TypeOrmModule]
})

export class UserModule {}
