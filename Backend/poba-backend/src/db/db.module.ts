import { Module } from '@nestjs/common';
import { DbController } from './db.controller';
import { DbService } from './db.service';
import { PasswordService } from './password.service';

@Module({
    imports:[],
    controllers: [DbController],
    providers: [DbService, PasswordService],
})

export class DbModule {}